import speech_recognition as sr
import pyttsx3
import time
import threading

# === Setup Text-to-Speech ===
engine = pyttsx3.init()
engine.setProperty('rate', 150)

def speak_lines(lines):
    for line in lines:
        print(f"🗣️ CodeSage: {line}")
        engine.say(line)
        engine.runAndWait()
        time.sleep(0.5)

# === Listen with timeout and warning ===
def listen(timeout_duration):
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("\n🎤 Listening for your response (up to 5 minutes)...")
        recognizer.adjust_for_ambient_noise(source)

        # Timer to warn after 5 minutes
        warning_timer = threading.Timer(timeout_duration, lambda: speak_lines(["You have less time left to answer."]))
        warning_timer.start()

        try:
            audio = recognizer.listen(source, timeout=timeout_duration + 60)
            warning_timer.cancel()
            text = recognizer.recognize_google(audio)
            print(f"👤 You said: {text}")
            return text.lower()
        except sr.WaitTimeoutError:
            speak_lines(["Time's up. Let's move to the next question."])
            return "timeout"
        except sr.UnknownValueError:
            speak_lines(["Sorry, I couldn't understand that."])
            return ""
        except sr.RequestError:
            speak_lines(["Speech recognition service is currently unavailable."])
            return ""

# === Questions and keywords ===
questions = [
    {
        "question": [
            "Your first task is:",
            "Implement a function to find duplicates in an array.",
            "Please explain your approach out loud."
        ],
        "keywords": ["set", "hash"]
    },
    {
        "question": [
            "Next question:",
            "Implement a function to check if a string is a palindrome.",
            "Please explain your logic."
        ],
        "keywords": ["reverse", "palindrome", "two pointers"]
    },
    {
        "question": [
            "Final question:",
            "Write a function to find the maximum number in a list.",
            "Please describe your logic."
        ],
        "keywords": ["max", "maximum", "compare", "loop"]
    }
]

# === Keyword matching ===
def analyze_answer(answer_text, expected_keywords):
    for keyword in expected_keywords:
        if keyword in answer_text:
            return True
    return False

# === Main interview flow ===
def start_interview():
    speak_lines([
        "Welcome to CodeSage, your AI coding interviewer. You will be asked three coding questions. You will have 5 minutes to answer each one. Please explain your answers clearly. Say 'stop' at any time to end the interview."
    ])

    for idx, q in enumerate(questions):
        # Announce next question vocally
        if idx == 0:
            speak_lines(["Let's start with the first question."])
        else:
            speak_lines([f"Moving on to question number {idx + 1}."])

        # Speak all question lines
        speak_lines(q["question"])

        # Silent thinking time 60 seconds
        print("⏳ Waiting for 60 seconds before listening...")
        time.sleep(60)

        # Prompt user vocally to answer
        speak_lines([
            "I'm waiting for your response now. You can begin.",
            "Please answer the question when ready."
        ])

        while True:
            response = listen(timeout_duration=300)  # 5 minutes timer

            if response == "timeout":
                break  # move to next question after timeout
            if any(word in response for word in ["stop", "exit", "quit"]):
                speak_lines(["Interview session ended. Good luck!"])
                return

            correct = analyze_answer(response, q["keywords"])
            if correct:
                speak_lines([
                    "Great! That's the correct approach.",
                    "Moving on to the next question." if idx < len(questions) - 1 else "You've completed all questions.",
                ])
                break
            else:
                speak_lines([
                    "Hmm, that doesn't seem like the optimal solution.",
                    "Try again using a different approach."
                ])

    speak_lines([
        "Interview completed. Thank you for participating in CodeSage!"
    ])

# === Run ===
if __name__ == "__main__":
    start_interview()
