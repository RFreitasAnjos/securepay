# SecurePay Frontend - Microsoft Authentication Setup

## Environment Variables

Create a `.env.local` file in the `securepay-frontend` directory with the following variables:

```env
# Azure AD Configuration
NEXT_PUBLIC_AZURE_CLIENT_ID=your_client_id_here
NEXT_PUBLIC_AZURE_TENANT_ID=your_tenant_id_here
NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000
```

## Getting Your Credentials

### From Azure Portal:

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Create a new app registration or select an existing one
4. Copy the **Application (client) ID** → Set as `NEXT_PUBLIC_AZURE_CLIENT_ID`
5. Copy the **Directory (tenant) ID** → Set as `NEXT_PUBLIC_AZURE_TENANT_ID`
6. Under **Authentication**, add **Redirect URI**: `http://localhost:3000`

## How the Authentication Flow Works

1. **User clicks "Sign in with Microsoft" button** → Opens Microsoft login popup
2. **After successful authentication** → Redirects to `/dashboard` (authorized page)
3. **On authentication failure** → Redirects to `/unauthorized` page
4. **Dashboard page** displays user information and confirms successful authentication

## Components Overview

### ButtonLogin
- Triggers Microsoft login popup
- Handles successful login (redirects to dashboard)
- Handles login errors (redirects to unauthorized page)

### ButtonLogout
- Logs out the current user
- Clears session and redirects to home page

### MSALProvider
- Wraps the entire app with Microsoft Authentication Library provider
- Manages authentication state globally

### /dashboard
- Authorization page - shown only to authenticated users
- Displays user information
- Protected route that redirects to `/unauthorized` if user is not authenticated

### /unauthorized
- Shown when user authentication fails or session expires
- Provides option to return to home page

## Testing the Flow

```bash
cd securepay-frontend
npm install
npm run dev
```

Navigate to `http://localhost:3000` and click the login button to test the Microsoft authentication flow.

## Security Notes

- Never commit your `.env.local` file with real credentials
- Always use environment variables for sensitive data
- The redirect URI must match exactly what's configured in Azure AD
- Session storage is used by default (clears when browser closes)
