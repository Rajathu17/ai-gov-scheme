
# AI-Powered Platform for Government Scheme Accessibility

**Overview**  
This project is an AI-driven web application designed to streamline access to government welfare schemes. It simplifies the discovery, application, and tracking of welfare programs by integrating cutting-edge technologies such as machine learning, OCR, and NLP.

## Key Features

1. **Personalized Scheme Recommendations (ML)**
   - Leverages machine learning models to suggest relevant government schemes based on user profile, eligibility, and preferences.

2. **Automated Document Verification (OCR)**
   - Utilizes Optical Character Recognition (OCR) to verify uploaded documents in real-time, reducing manual paperwork and potential errors.

3. **Multilingual NLP Chatbot**
   - Provides conversational assistance in multiple languages, guiding users through the application process and answering queries about available schemes.

4. **User-Friendly UI/UX**
   - Focuses on accessibility, responsive design, and a clean interface to ensure a seamless experience for diverse user groups (including those with limited tech literacy).

---

## Live Demo

Check out the live deployed version of Landing page:

[Deployed Link](https://darling-creponne.netlify.app/)

Features:
[Deployed Link](https://neon-sable-a0fbd5.netlify.app/)



## Technology Stack

- **Frontend**: Vite + React + TypeScript, Tailwind CSS (for styling)
- **Backend**: [Supabase](https://supabase.com/) (PostgreSQL database, authentication, and API), Node.js (if additional server logic is required)
- **Machine Learning**: Placeholder for integrating model endpoints or on-device ML libraries (e.g., TensorFlow.js)
- **OCR Integration**: Tesseract.js or external OCR services
- **NLP Chatbot**: Placeholder for integration with NLP frameworks or APIs (e.g., Rasa, Dialogflow)

---

## Installation & Setup

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/yourusername/ai-gov-schemes.git
   cd ai-gov-schemes
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```
   or
   ```bash
   yarn
   ```

3. **Configure Environment Variables**  
   - Create a `.env` file in the root directory.
   - Add the necessary environment variables (e.g., Supabase URL and keys, optional external API keys).
   ```bash
   VITE_SUPABASE_URL=https://<YOUR_SUPABASE_PROJECT>.supabase.co
   VITE_SUPABASE_ANON_KEY=<YOUR_SUPABASE_ANON_KEY>
   ```

4. **Run the Development Server**  
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

5. **Build for Production**  
   ```bash
   npm run build
   ```
   or
   ```bash
   yarn build
   ```

---

## Usage

1. **Landing Page**  
   - Showcases the platform’s main features (scheme discovery, chatbot, document verification).
   - Allows users to register or log in.

2. **User Registration & Login**  
   - Users can create accounts, log in, and access personalized dashboards.

3. **User Dashboard**  
   - Displays recommended schemes, pending applications, and document upload options.
   - Provides a chatbot icon (bottom-right corner) for assistance.

4. **Chatbot**  
   - Responds to user queries in multiple languages (static or integrated with an NLP service).
   - Guides users through application processes or clarifies scheme details.

5. **Document Upload & OCR**  
   - Users upload required documents for scheme applications.
   - The system verifies and extracts data automatically (OCR integration).

---

## ER Diagram & Database Structure

- **Profiles**: Stores user information (full name, language preference, phone number).  
- **Auth**: Handled by Supabase (`auth.users` table).  
- **Chat Messages**: Records user-bot interactions, language, and timestamps.  
- **Documents**: Stores references to uploaded files, file paths, OCR output, etc.  
- **Application Documents**: Links documents to a specific application.  
- **Applications**: Tracks application status, submission date, and relevant scheme info.
![image](https://github.com/user-attachments/assets/a0b4c3f9-1756-4f20-ba37-1ab5c5ab6835)

*(Refer to the `migrations` folder and ER diagram for the full database schema.)*

## Contributing

1. **Fork the Repository**  
2. **Create a New Branch** (`feature/my-awesome-feature`)  
3. **Commit Changes** (`git commit -m 'Add new feature'`)  
4. **Push to Branch** (`git push origin feature/my-awesome-feature`)  
5. **Open a Pull Request**

We welcome any improvements or new features you’d like to propose.

---

## License

This project is open-source. Refer to the `LICENSE` file (if provided) for detailed licensing information.

---

### Contact & Further Information

For questions, suggestions, or to report issues, please open an [issue](https://github.com/yourusername/ai-gov-schemes/issues) or reach out via email: **contact@youremail.com**.

---

**Enjoy building and extending the AI-Powered Platform for Government Scheme Accessibility!**
