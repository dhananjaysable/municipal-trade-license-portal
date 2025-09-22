// contexts/ChatContext.js
import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const ChatContext = createContext({});

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '👋 Hello! I\'m your AI assistant for trade license services. I can help you with:\n\n• 🔍 Search licenses by number/email/phone\n• 📋 Application process guidance\n• 💰 Fee information and payments\n• 📊 Track application status\n• 📄 Document requirements\n\nWhat would you like to know?',
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Enhanced responses for citizen queries
  const citizenResponses = {
    'search': {
      keywords: ['search license', 'find license', 'search by email', 'search by phone', 'search property', 'find my license'],
      response: `🔍 **Search Your License/Property:**

**Search Options Available:**
• 📧 **Email Address** - Enter your registered email
• 📱 **Mobile Number** - Use your registered phone number  
• 🆔 **License Number** - Format: TL-YYYY-XXX
• 🏢 **Property Details** - Address or property ID

**How to Search:**
1. Go to Track Application page
2. Enter any of the above details
3. View complete application status
4. Download certificates if approved

**Search Tips:**
• Use exact email/phone as registered
• License numbers are case-sensitive
• Contact support if details don't match

**Need help with specific search?** Just tell me what you're looking for!`,
      followUp: ['Search by email', 'Search by phone', 'Find license number', 'Property search help']
    },

    'license_search': {
      keywords: ['find my license', 'where is my license', 'license status', 'check license'],
      response: `🆔 **Find Your Trade License:**

**Quick Search Steps:**
1. Visit our Track Application page
2. Enter one of these:
   • License Number (TL-2024-XXX)
   • Registered email address
   • Mobile number (10 digits)

**License Status Types:**
• ✅ **Approved** - Active license, download available
• ⏳ **Under Review** - Being processed
• 📋 **Document Verification** - Papers being checked
• ❌ **Rejected** - Needs correction

**Can't Find Your License?**
• Check spam folder for emails
• Verify phone number format
• Try alternate email addresses
• Contact support with application receipt

**Search now and I'll guide you through!**`,
      followUp: ['Go to search page', 'License number format', 'Status meanings']
    },

    'property': {
      keywords: ['property search', 'find property', 'property license', 'business property'],
      response: `🏢 **Property & Business License Search:**

**Property Search Methods:**
• 📍 **Business Address** - Full registered address
• 🏢 **Property ID** - Municipal property number
• 📧 **Owner Email** - Registered contact email
• 📱 **Contact Number** - Business phone number

**Property Information Available:**
• Current license status
• Renewal dates and history  
• Fee payment records
• Compliance status
• Inspection reports

**Property License Types:**
• 🏪 Retail establishments
• 🏭 Manufacturing units
• 🍽️ Food service outlets
• ⚕️ Healthcare facilities
• 🏢 Office complexes

**Search Your Property Now:**
Use any property identifier in our search tool!`,
      followUp: ['Property ID help', 'Address format', 'License types']
    },

    'payment': {
      keywords: ['payment', 'pay fee', 'license fee', 'online payment', 'fee amount'],
      response: `💰 **License Fee Payment Guide:**

**Payment Options:**
• 💳 Credit/Debit Cards (Visa, Mastercard, RuPay)
• 📱 UPI (PhonePe, GPay, Paytm, BHIM)
• 🏦 Net Banking (All major banks)
• 💰 Digital Wallets

**Fee Structure:**
• 🏪 Small Business: ₹2,500/year
• 🏬 Medium Business: ₹5,000/year
• 🏭 Large Business: ₹10,000/year
• 📋 Processing Fee: ₹500 (one-time)

**Payment Process:**
1. Search your application
2. Verify fee amount
3. Choose payment method
4. Complete secure payment
5. Download receipt immediately

**Payment Benefits:**
• ✅ Instant receipt generation
• 📧 Email confirmation
• 🔒 100% secure transactions
• 📱 SMS updates

**Ready to pay? I can guide you step by step!**`,
      followUp: ['Payment methods', 'Fee calculator', 'Payment issues']
    },

    'track': {
      keywords: ['track application', 'application status', 'check status', 'application progress'],
      response: `📊 **Track Your Application Status:**

**Current Status Options:**
• 📝 **Submitted** - Application received successfully
• 👀 **Under Review** - Documents being verified
• 🔍 **Field Inspection** - Physical verification in progress
• ✅ **Approved** - License granted, ready for download
• ❌ **Rejected** - Corrections needed

**Tracking Methods:**
• 🆔 Application/License number
• 📧 Email address used during application
• 📱 Mobile number (registered)

**What You'll See:**
• Current processing stage
• Estimated completion time
• Required actions (if any)
• Payment status
• Document status

**Timeline Information:**
• Average processing: 7-10 days
• Expedited processing: 3-5 days (additional fee)
• Complex cases: 15-20 days

**Track now for real-time updates!**`,
      followUp: ['Check my status', 'Processing timeline', 'Status meanings']
    },

    'documents': {
      keywords: ['documents required', 'what documents', 'paperwork', 'certificates needed'],
      response: `📄 **Required Documents for Trade License:**

**Mandatory Documents:**
• 📋 Filled application form
• 🆔 Identity proof (Aadhar/Passport/Driving License)
• 📧 Address proof (Utility bill/Rent agreement)
• 🏢 Property documents (Ownership/NOC)
• 📸 Passport-size photographs (2 copies)
• 💼 Business registration certificate

**Business-Specific Documents:**
• 🍽️ **Food Business:** FSSAI license, Health certificate
• 🏭 **Manufacturing:** Environmental clearance, Fire NOC
• ⚕️ **Healthcare:** Professional licenses, Drug license
• 🏪 **Retail:** Shop establishment license

**Document Guidelines:**
• ✅ Clear, readable scans/photos
• 📱 PDF, JPG, PNG formats only
• 🔢 Max file size: 5MB per document
• 📝 All documents should be current and valid

**Upload Tips:**
• Use good lighting for photos
• Ensure all text is visible
• Check file size before upload

**Need help with specific documents?**`,
      followUp: ['Document formats', 'Upload help', 'Specific business docs']
    },

    'help': {
      keywords: ['help', 'support', 'contact', 'assistance', 'problem'],
      response: `🆘 **Get Help & Support:**

**Instant Help Available:**
• 💬 Chat with me for immediate assistance
• 📞 Call: +91-721-2530000 (9 AM - 6 PM)
• 📧 Email: support@municipal.gov.in
• 🌐 Help Center: FAQ and guides

**Common Issues I Can Solve:**
• 🔍 Search problems
• 💰 Payment failures
• 📄 Document upload errors
• 📱 Mobile/email verification
• 🔐 Login difficulties

**Self-Service Options:**
• 📋 Step-by-step guides
• 🎥 Video tutorials
• ❓ Frequently asked questions
• 📖 Download user manual

**For Complex Issues:**
• 📞 Phone support (faster resolution)
• 📧 Email support (detailed queries)
• 🏢 Visit office (if required)

**I'm here 24/7 to help you! What specific issue are you facing?**`,
      followUp: ['Login help', 'Search issues', 'Payment problems', 'Technical support']
    }
  };

  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase().trim();
    
    // Search for matching responses
    for (const [key, data] of Object.entries(citizenResponses)) {
      if (data.keywords.some(keyword => input.includes(keyword))) {
        return {
          response: data.response,
          followUp: data.followUp,
          category: key
        };
      }
    }

    // Special handling for specific queries
    if (input.includes('license number') && input.includes('format')) {
      return {
        response: `🆔 **License Number Format:**

**Standard Format:** TL-YYYY-XXX
• TL = Trade License
• YYYY = Year (e.g., 2024)
• XXX = Sequential number (001, 002, etc.)

**Examples:**
• TL-2024-001 ✅
• TL-2024-156 ✅
• TL2024001 ❌ (missing hyphens)

**Where to Find:**
• Email confirmation received after submission
• SMS sent to registered mobile number
• Payment receipt
• Application acknowledgment

**Can't find your number?** Use email or phone to search instead!`,
        followUp: ['Search by email', 'Search by phone', 'Contact support'],
        category: 'license_format'
      };
    }

    // Default helpful response
    return {
      response: `🤖 **I'm here to help with trade licenses!**

**Popular Services:**
• 🔍 **Search License** - Find by email/phone/number
• 📊 **Track Application** - Check real-time status
• 💰 **Pay Fees** - Online payment options
• 📄 **Document Help** - Requirements and upload
• 🏢 **Property Search** - Find business licenses

**Quick Actions:**
• Type "search license" to find your license
• Type "track status" to check application
• Type "payment help" for fee information
• Type "documents" for requirements

**Smart Search Tips:**
• "Find my license by email"
• "Check payment status"
• "Property license search"
• "Documents needed for food business"

**What would you like to do today?**`,
      followUp: ['Search my license', 'Track application', 'Payment help', 'Document requirements'],
      category: 'general'
    };
  };

  const sendMessage = async (text) => {
    const userMessage = {
      id: Date.now(),
      text,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    const { response, followUp, category } = generateResponse(text);

    const botMessage = {
      id: Date.now() + 1,
      text: response,
      isBot: true,
      timestamp: new Date(),
      followUp: followUp,
      category: category
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botMessage]);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const clearChat = () => {
    setMessages([{
      id: 1,
      text: '👋 Hello! I\'m your AI assistant for trade license services. I can help you with:\n\n• 🔍 Search licenses by number/email/phone\n• 📋 Application process guidance\n• 💰 Fee information and payments\n• 📊 Track application status\n• 📄 Document requirements\n\nWhat would you like to know?',
      isBot: true,
      timestamp: new Date(),
    }]);
  };

  // Only show chatbot for citizens (non-admin users) and on public pages
  const shouldShowChatbot = !user || user.role !== 'admin';

  const value = {
    isOpen,
    messages,
    isTyping,
    sendMessage,
    toggleChat,
    clearChat,
    shouldShowChatbot
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
