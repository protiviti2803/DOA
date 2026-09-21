import os
import json
from pathlib import Path
from sqlalchemy.orm import Session
from app.database.database import engine, Base, SessionLocal
from app.database.models import User, DOARecord, DOAVersion, AuditLog
from app.core.security import get_password_hash
from app.services.version_service import create_published_version_snapshot

def seed_database():
    print("Initializing SQLite Database tables...")
    Base.metadata.create_all(bind=engine)
    
    db: Session = SessionLocal()
    try:
        # 1. Seed Users
        # 1. Seed 4 Distinct Roles for Prototype
        seed_users_data = [
            {
                "email": "sysadmin@doa.local",
                "password": "SysAdmin@123",
                "full_name": "IT & System Administrator",
                "role": "SYSTEM_ADMINISTRATOR",
                "department": "Information Technology / Systems"
            },
            {
                "email": "doaadmin@doa.local",
                "password": "DoaAdmin@123",
                "full_name": "Chief Delegation Officer (DOA Admin)",
                "role": "DOA_ADMINISTRATOR",
                "department": "Executive Office / DOA Governance"
            },
            {
                "email": "governance@doa.local",
                "password": "GovTeam@123",
                "full_name": "Risk & Governance Reviewer",
                "role": "GOVERNANCE_TEAM",
                "department": "Enterprise Governance & Compliance"
            },
            {
                "email": "user@doa.local",
                "password": "User@123",
                "full_name": "Business Line Analyst / Requester",
                "role": "NORMAL_USER",
                "department": "Risk & Finance Operations"
            },
            # Backward compatibility alias
            {
                "email": "admin@doa.local",
                "password": "Admin@123",
                "full_name": "Global Governance Administrator",
                "role": "DOA_ADMINISTRATOR",
                "department": "Executive Office"
            }
        ]

        for u in seed_users_data:
            existing_user = db.query(User).filter(User.email == u["email"]).first()
            if not existing_user:
                db_user = User(
                    email=u["email"],
                    hashed_password=get_password_hash(u["password"]),
                    full_name=u["full_name"],
                    role=u["role"],
                    department=u["department"],
                    is_active=True
                )
                db.add(db_user)
                print(f"[+] Created user: {u['email']} ({u['role']})")
            else:
                existing_user.role = u["role"]
                existing_user.full_name = u["full_name"]

        db.commit()


        # 2. Seed Master DOA Records from seed_doa_data.json
        json_path = Path(__file__).parent / "seed_doa_data.json"
        if json_path.exists():
            with open(json_path, "r", encoding="utf-8") as f:
                doa_list = json.load(f)

            count = 0
            for item in doa_list:
                item_id = str(item.get("id"))
                existing = db.query(DOARecord).filter(DOARecord.id == item_id).first()
                if not existing:
                    rec = DOARecord(
                        id=item_id,
                        parent_function=item.get("parentFunction") or item.get("function") or "Finance",
                        function=item.get("function") or item.get("parentFunction") or "Finance",
                        business_line=item.get("businessLine") or item.get("category") or "",
                        category=item.get("category") or item.get("businessLine") or "",
                        key_non_key=item.get("keyNonKey", "Key"),
                        decision_area=item.get("decisionArea", ""),
                        shareholders=item.get("shareholders", ""),
                        board_of_directors=item.get("boardOfDirectors", ""),
                        subsidiary_board=item.get("subsidiaryBoard", ""),
                        chairman=item.get("chairman", ""),
                        board_committees=item.get("boardCommittees", ""),
                        board_committees_op=item.get("boardCommitteesOp", ""),
                        board_committees2=item.get("boardCommittees2", ""),
                        board_committees2_op=item.get("boardCommittees2Op", ""),
                        gceo=item.get("gceo", ""),
                        ceo=item.get("ceo", ""),
                        mgmt_committees=item.get("mgmtCommittees", ""),
                        mgmt_committees_op=item.get("mgmtCommitteesOp", ""),
                        mgmt_committees2=item.get("mgmtCommittees2", ""),
                        mgmt_committees2_op=item.get("mgmtCommittees2Op", ""),
                        c_level1=item.get("cLevel1", ""),
                        c_level1_op=item.get("cLevel1Op", ""),
                        c_level2=item.get("cLevel2", ""),
                        c_level2_op=item.get("cLevel2Op", ""),
                        comments=item.get("comments", ""),
                        regulatory=item.get("regulatory", "N"),
                        composite_authority=item.get("compositeAuthority", "BoD (A)"),
                        rationale=item.get("comments", ""),
                        current_version=1,
                        status="PUBLISHED",
                        effective_date="2026-01-01",
                        review_date="2027-01-01",
                        created_by="admin@doa.local"
                    )
                    db.add(rec)
                    db.flush()
                    # Create corresponding initial Version 1 snapshot
                    create_published_version_snapshot(db, rec, "admin@doa.local")
                    count += 1

            db.commit()
            print(f"[+] Successfully seeded {count} published DOA master records with v1 snapshots.")
        else:
            print(f"Warning: seed_doa_data.json not found at {json_path}")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
