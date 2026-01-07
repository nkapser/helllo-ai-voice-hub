# Email Newsletter Service Recommendations

## Top Recommendations (Similar to EmailJS in ease of use)

### 1. **Brevo (formerly Sendinblue)** ⭐ RECOMMENDED
- **Free Tier**: 300 emails/day, unlimited contacts
- **API**: RESTful API, easy integration
- **Features**: Email marketing, automation, analytics
- **Pricing**: Free up to 300 emails/day, then $25/month
- **Best for**: Startups, small businesses
- **Website**: https://www.brevo.com

### 2. **Resend** ⭐ DEVELOPER-FRIENDLY
- **Free Tier**: 3,000 emails/month, 100 emails/day
- **API**: Modern REST API, excellent documentation
- **Features**: Transactional emails, React email templates
- **Pricing**: Free tier, then $20/month
- **Best for**: Developers, modern applications
- **Website**: https://resend.com

### 3. **Mailchimp**
- **Free Tier**: 2,000 contacts, 10,000 emails/month
- **API**: Well-documented API
- **Features**: Full email marketing suite, automation
- **Pricing**: Free tier, then $13/month
- **Best for**: Established businesses, comprehensive features
- **Website**: https://mailchimp.com

### 4. **ConvertKit**
- **Free Tier**: Up to 1,000 subscribers
- **API**: Good API support
- **Features**: Creator-focused, automation, landing pages
- **Pricing**: Free up to 1,000 subscribers, then $29/month
- **Best for**: Content creators, bloggers
- **Website**: https://convertkit.com

### 5. **Buttondown**
- **Free Tier**: Unlimited subscribers, 1,000 emails/month
- **API**: Simple REST API
- **Features**: Simple, markdown support, developer-friendly
- **Pricing**: Free tier, then $9/month
- **Best for**: Developers, simple newsletters
- **Website**: https://buttondown.email

## Implementation Choice

**I recommend Brevo** for this project because:
- ✅ Similar simplicity to EmailJS
- ✅ Generous free tier (300 emails/day)
- ✅ Easy API integration
- ✅ Good documentation
- ✅ GDPR compliant
- ✅ Good deliverability rates

## Setup Instructions for Brevo

1. Sign up at https://www.brevo.com
2. Create a contact list
3. Get your API key from Settings → API Keys
4. Add to `.env.local`: `VITE_BREVO_API_KEY=your_api_key`
5. Add list ID: `VITE_BREVO_LIST_ID=your_list_id`

