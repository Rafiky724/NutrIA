from passlib.context import CryptContext

# Use bcrypt_sha256 to avoid bcrypt's 72-byte input limit.
# bcrypt_sha256 first hashes the password with SHA-256 and then applies bcrypt,
# which allows safely accepting passwords longer than 72 bytes without manual truncation.
#pwd_context = CryptContext(schemes=["bcrypt_sha256"], deprecated="auto")
pwd_context = CryptContext(
    schemes=["bcrypt"],
    bcrypt__ident="2b",
    deprecated="auto"
)

def hash_password(password: str) -> str:
    """Hash a plaintext password."""
    print("PASSWORD RECIBIDA:", repr(password), "LENGTH:", len(password))
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plaintext password against a hashed password."""
    return pwd_context.verify(plain_password, hashed_password)