from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
import json

from app.database.database import get_db
from app.database.models import User, DOARecord, ChangeRequest
from app.core.dependencies import get_current_user, require_roles
from app.schemas.schemas import DOARead, ChangeRequestRead, ChangeRequestCreate
from app.services import doa_service, change_request_service
from app.api.change_requests import format_cr_response

router = APIRouter(prefix="/user", tags=["Normal User Workspace"])

# Allow NORMAL_USER and admin roles
require_normal_user = require_roles(["NORMAL_USER", "ADMIN", "DOA_ADMINISTRATOR", "SYSTEM_ADMINISTRATOR", "GOVERNANCE_TEAM"])

@router.get("/dashboard")
def get_user_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_normal_user)
):
    """
    Dedicated dashboard summary for Normal Users (Business Line Analysts).
    Returns personal proposal stats, recent user submissions, and active published rule counts.
    """
    my_requests = db.query(ChangeRequest).filter(ChangeRequest.requester_id == current_user.id).all()
    
    total_my_requests = len(my_requests)
    my_pending = sum(1 for r in my_requests if r.status == "SUBMITTED")
    my_approved = sum(1 for r in my_requests if r.status == "APPROVED")
    my_published = sum(1 for r in my_requests if r.status == "PUBLISHED")
    my_rejected = sum(1 for r in my_requests if r.status == "REJECTED")

    total_published_doa = db.query(DOARecord).filter(DOARecord.status == "PUBLISHED").count()

    recent_submissions = (
        db.query(ChangeRequest)
        .filter(ChangeRequest.requester_id == current_user.id)
        .order_by(ChangeRequest.created_at.desc())
        .limit(5)
        .all()
    )

    return {
        "role": current_user.role,
        "user_name": current_user.full_name,
        "total_my_requests": total_my_requests,
        "my_pending": my_pending,
        "my_approved": my_approved,
        "my_published": my_published,
        "my_rejected": my_rejected,
        "total_published_doa": total_published_doa,
        "recent_submissions": [format_cr_response(cr) for cr in recent_submissions]
    }

@router.get("/doa", response_model=List[DOARead])
def get_user_doa_matrix(
    parent_function: Optional[str] = Query(None),
    business_line: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_normal_user)
):
    """Normal user access to search published DOA master rules."""
    return doa_service.get_doa_records(
        db=db,
        parent_function=parent_function,
        business_line=business_line,
        status="PUBLISHED",
        search=search
    )

@router.get("/my-requests", response_model=List[ChangeRequestRead])
def get_my_change_requests(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_normal_user)
):
    """Fetch only change requests authored by this user."""
    crs = change_request_service.get_change_requests(
        db=db,
        user_id=current_user.id,
        is_admin=False
    )
    return [format_cr_response(cr) for cr in crs]

@router.post("/proposals", response_model=ChangeRequestRead)
def submit_proposal(
    payload: ChangeRequestCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_normal_user)
):
    """Submit a new rule proposal (ADD, MODIFY, or DELETE)."""
    cr = change_request_service.create_change_request(db, payload, current_user)
    return format_cr_response(cr)
