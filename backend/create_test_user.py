from app.database import SessionLocal
from app.models.user import User, RoleEnum
from app.utils.auth import get_password_hash

def create_admin_user():
    db = SessionLocal()

    existing_user = db.query(User).filter(User.username == "adminuser").first()
    if existing_user:
        print("⚠️ Admin user already exists.")
        return

    new_user = User(
        username="adminuser",
        matric_no=None,  # Not required for admin
        password_hash=get_password_hash("admin123"),
        role=RoleEnum.admin
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    print("✅ Admin user created successfully.")

if __name__ == "__main__":
    create_admin_user()
