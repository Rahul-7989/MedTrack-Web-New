# 🩺 MedTrack

**MedTrack** is a family-centered medication management web application designed to help people take medicines on time — together with their family.  
- Focused on calm design, safety, and shared responsibility.

---

## 🌱 What’s New in This Version

This version of MedTrack introduces a more thoughtful, human-first approach to medication tracking:

- Family-based **Hub system** instead of individual-only tracking  
- Approval-based hub joining for **better safety**
- Smart features like **Voice Memo** and **Chat Bot** that reduce effort while keeping users in control

---

## ✨ Key Features

### 👨‍👩‍👧 Family Hub System
- Create or join a **Family Hub**
- Share a unique hub code
- Hub creator approves join requests before access is granted
- Clear **Creator** and **Member** roles

---

### 💊 Medication Management
- Add medication cards with:
  - Medicine name
  - Dosage
  - Time to take
  - Assigned family member
  - Optional remarks
  - Optional image upload
- Mark medications as **Taken**
- Daily reset of medication status at **12:00 AM**
- Only the creator of a medication card can **edit or delete** it

---

### ⏰ Smart Reminders & Notifications
- Notification when it’s exactly time to take medicine
- Gentle reminder after 5 minutes if missed
- Family members are notified after 10 minutes if still not taken
- Missed doses are tagged clearly but calmly

---

### 🕰 Location-Aware Digital Clock
- Displays local time based on user location
- Helps align medication timing accurately
- Privacy-first fallback to device time if location access is denied

---

### 🎙 Smart Voice Memo (Optional)
- Add medications using voice
- Converts speech into a medication card draft
- Powered by **Gemini**
- User always reviews and confirms before saving
- Clear microphone permission handling

---

### 🤖 CareMate Chatbot
- Built using **Gemini**
- Answers general medication-related questions
- Personalized using user profile data
- Includes clear medical disclaimers
- No diagnosis or emergency advice

---

## 🛠 Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Design & Prototyping:** Google AI Studio  
- **AI & NLP:** Google Gemini  
- **Authentication:** Email-based authentication with verification  
- **Notifications:** Time-based logic (client/server driven)  
- **Voice Processing:** Browser Speech APIs + Gemini  


