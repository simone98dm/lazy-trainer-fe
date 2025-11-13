# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

The Lazy Trainer team takes security bugs seriously. We appreciate your efforts to responsibly disclose your findings, and will make every effort to acknowledge your contributions.

### Where to Report

To report a security issue, please **DO NOT** create a public GitHub issue. Instead:

1. **Email**: Send details to [simone.dalmas@outlook.it](mailto:simone.dalmas@outlook.it)
2. **Subject**: Use the format "SECURITY: Brief description"
3. **Include**:
   - Type of issue (e.g., SQL injection, XSS, etc.)
   - Full paths of source file(s) related to the issue
   - Location of affected source code (tag/branch/commit or URL)
   - Step-by-step instructions to reproduce the issue
   - Proof-of-concept or exploit code (if possible)
   - Impact of the issue

### What to Expect

- **Acknowledgment**: We'll acknowledge receipt within 48 hours
- **Assessment**: We'll assess the vulnerability and its impact
- **Updates**: We'll keep you informed of the progress
- **Resolution**: We'll work on a fix and coordinate disclosure timing
- **Credit**: We'll credit you in the security advisory (unless you prefer to remain anonymous)

### Response Timeline

| Action            | Timeline                               |
| ----------------- | -------------------------------------- |
| Initial Response  | Within 48 hours                        |
| Issue Assessment  | Within 7 days                          |
| Fix Development   | Within 30 days (depending on severity) |
| Public Disclosure | After fix is deployed                  |

## Security Best Practices

When contributing to this project:

### Environment Variables

- Never commit `.env` files
- Never hardcode secrets in source code
- Use environment variables for sensitive data
- Rotate credentials regularly

### Authentication

- Always use Supabase authentication
- Never store passwords in plain text
- Implement proper session management
- Use HTTPS in production

### Data Validation

- Validate all user inputs
- Sanitize data before database queries
- Use parameterized queries (Supabase does this automatically)
- Implement proper CORS policies

### Frontend Security

- Avoid using `dangerouslySetInnerHTML` or `v-html` with user content
- Implement Content Security Policy (CSP)
- Keep dependencies up to date
- Use Subresource Integrity (SRI) for CDN resources

### API Security

- Implement rate limiting
- Use Row Level Security (RLS) in Supabase
- Validate API requests
- Log security events

## Known Security Considerations

### Supabase Configuration

- Row Level Security (RLS) is enabled on all tables
- Anonymous keys have restricted permissions
- Service role key is only used server-side

### PWA Security

- Service worker caches are properly scoped
- No sensitive data is cached offline
- Cache invalidation is implemented

### HTTPS

- Production deployment uses HTTPS
- Secure cookies are enabled in production
- HSTS headers are configured

## Security Updates

Security updates are released as soon as possible:

- **Critical**: Within 24-48 hours
- **High**: Within 7 days
- **Medium**: Within 30 days
- **Low**: Next regular release

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine affected versions
2. Audit code to find similar problems
3. Prepare fixes for all supported versions
4. Release patches as soon as possible

We will credit the reporter in the security advisory unless they prefer to remain anonymous.

## Comments on this Policy

If you have suggestions on how this process could be improved, please submit a pull request or open an issue.

---

**Last Updated**: November 13, 2025
