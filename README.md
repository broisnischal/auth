# Authentication

Refresh access token rotation, concept, session management, JWT token generation, token validation, token blacklisting, token versioining, etc.

This module will be used by other modules to authenticate users.

## Multi factor authentication

MFA is when a user is required to input more than just a password to authenticate. There are mainly 5 types of factors:

Something you know: Passwords
Something you have: Device, email address, SMS
Something you are: Biometrics
Somewhere you are
Something you do

- TOTP (Time-based One-Time Password)
  --> Google Authenticator, Authy, and Microsoft Auth
  -- Generate QR code, validate OTPs

- SMS OTP (One-Time Password via SMS)
- Email OTP (One-Time Password via Email)

WebAuthn

- FIDO2 (Fast IDentity Online)
- U2F (Universal 2nd Factor)

Recovery codes

- Generate recovery codes, store them securely, and allow users to use them to recover access if they lose their device.

### OAuth

1. Authorization Code Grant
2. Implicit Grant
3. Resource Owner Password Credentials Grant
4. Client Credentials Grant
5. OpenID Connect (OIDC)

### JWT (JSON Web Tokens)

JSON Web Tokens (JWT) are an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

1. Header: contains the type of token (e.g. JWT) and the signing algorithm used (e.g. HMAC SHA256 or RSA).
2. Payload: contains the claims (e.g. user ID, expiration time, scope, etc.) that are being transferred.
3. Signature: is used to verify the integrity of the token.

### Refresh token rotation

Refresh tokens are used to obtain new access tokens without requiring the user to re-authenticate. The refresh token is typically valid for several days, and can be revoked by the user or the client. When the refresh token is used to obtain a new access token, the old refresh token is invalidated.

### Session management

Session management is the process of managing user sessions, including login, logout, and session expiration. The session management module should be responsible for creating, verifying, and invalidating sessions.

### Token validation

Token validation is the process of verifying the validity of a token, such as an access token or a refresh token. The token validation module should be responsible for verifying the signature, expiration, and issuer of a token.

### Token blacklisting

Token blacklisting is the process of preventing the use of a token after it has been revoked or expired. The token blacklisting module should be responsible for storing revoked tokens and checking if a token has been revoked before using it.

### Token versioning

Token versioning is the process of incrementing the version of a token when it is refreshed or reissued. The token versioning module should be responsible for incrementing the version of a token and storing the previous versions for auditing purposes.

## Password Authentication

## Passwordless Authentication

## Email Verification

## Password Reset

## Sessions

- Session ID
- Session Hijacking, sniffing
- Session Invalidation
- Session Fixation Attacks

## Saml

## Bit wise, RBAC

CREATE - Represented by the first bit 0001
READ - Represented by the second bit 0010
UPDATE - Represented by the third bit 0100
DELETE - Represented by the fourth bit 1000
