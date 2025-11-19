# Brainrotter Project: A Detailed Explanation

This document breaks down the entire architecture of the Brainrotter project, from the frontend the user interacts with, to the backend services that generate the video content.

---

### 🏛️ High-Level Architecture

Think of the project like a restaurant with specialized staff:

1.  **The Frontend (React)**: This is the **waiter**. It takes the customer's (user's) order (the video topic and background choice) and sends it to the kitchen. It also brings the final dish (the generated video) back to the customer.
2.  **The API Gateway (Express.js)**: This is the **kitchen manager**. It takes the order from the waiter, validates it, and passes it to the correct specialist chef. It's the single point of contact for the frontend, keeping the kitchen organized and secure.
3.  **The AI Video Engine (Flask)**: This is the **specialist chef**. This chef has a unique set of skills (AI models, video processing) and is dedicated to a single, complex task: cooking the dish (generating the video).

Here is the flow of a request:

```
[User's Browser]      [Express Server]      [Flask Server]
  React App      -->   (Port 3000)     -->  (Port 5000)
(takes order)        (validates order)     (creates video)
      ↑                  ↑                     ↑
      |                  |                     |
(displays video) <-- (returns video URL) <-- (returns result)
```

---

###  Frontend: The Waiter (`brainrotter_frontend/`)

The frontend is what the user sees and interacts with. It's built with React and TypeScript.

-   **`main.tsx`**: This is the front door of the restaurant. It's the very first file that runs, and its main job is to render the `App` component and wrap it in essential "Context Providers".
    -   `BrowserRouter`: Enables page routing (e.g., `/home`, `/dashboard`).
    -   `BrainrotProvider`: Manages the "Brainrot Mode" toggle, making the `isBrainrot` state available to the entire app.

-   **`App.tsx`**: This is the main layout. It decides which page to show based on the URL and renders components that should be on *every* page, like the `GlitchBackground` and the `BrainrotToggle` switch.

-   **`pages/`**: This directory holds the different "rooms" or pages of our restaurant.
    -   **`GenerateClip.tsx`**: This is the most important page for the video generation workflow.
        1.  **State Management (`useState`)**: It uses `useState` hooks to keep track of what the user is doing: which background is selected, what topic they've typed, if the app is currently generating a video (`isGenerating`), and any errors.
        2.  **API Call (`handleGenerate`)**: When the user clicks "Generate", this function sends the `topic` and `background_video` choice to our "kitchen manager" (the Express.js backend) at `http://localhost:3000/api/clips/generate`. It does *not* talk to the Python chef directly.
        3.  **UI Updates**: It shows a loading spinner while waiting for the video and displays the final video or an error message upon completion.

-   **`contexts/BrainrotContext.tsx`**: This is the "mood lighting" control for the restaurant. It provides a global state (`isBrainrot`) that any component can check to decide whether to display professional text or "brainrot" slang and visuals.

---

### API Gateway: The Kitchen Manager (`backend/`)

This is a Node.js server using the Express.js framework. Its only job is to be a secure and stable middleman.

-   **`server.js`**: This file sets up and starts the Express server. It configures middleware like `cors` (to allow the frontend to make requests) and tells the server to use the routes defined in `clipRoutes.js`.

-   **`routes/clipRoutes.js`**: This file defines the API endpoints that the frontend can call.
    -   **`POST /api/clips/generate`**: This is the core endpoint.
        1.  **Receives Request**: It receives the `POST` request from the React frontend.
        2.  **Validates Data**: It checks if the `topic` and `background_video` are valid.
        3.  **Forwards Request**: It then makes its own API request (using `axios`) to the "specialist chef" (the Flask server) at `http://localhost:5000/api/generate`, forwarding the data. It sets a long timeout because video generation can be slow.
        4.  **Returns Response**: Once the Flask server responds, the Express server takes that response and sends it straight back to the React frontend.

---

### AI Video Engine: The Specialist Chef (`brainrotter_backend/`)

This is a Python server using the Flask framework. It handles all the complex, heavy-lifting AI and video processing tasks.

-   **`app.py`**: This is the main file for the Flask server.
    -   **`POST /api/generate`**: This is the endpoint that the Express server calls.
        1.  It receives the `topic` and `background_video` from Express.
        2.  It calls the `main` function in `generator.py` to start the entire video creation pipeline.
        3.  Once the pipeline is complete and it gets back the final video's filename and ID, it constructs a full URL (e.g., `http://localhost:5000/outputs/clip_123.mp4`).
        4.  It calculates the video's duration using `moviepy`.
        5.  It sends the final JSON response back to the Express server.
    -   **`/outputs/<filename>`**: This is a special route that allows the server to directly serve the generated video files from the `outputs/` folder, so they can be played in the browser.

-   **`generator.py`**: This script creates the story and the voiceover.
    -   `main()`: This function is the "Head Chef" of the AI process. It takes the `topic` and `background_video` name.
    -   **Narration Generation**: It first sends the topic to an LLM (like Google's Gemini) with a detailed prompt, asking it to write a ~60-second video script.
    -   `tts()`: The generated script (narration) is then passed to this function. It uses a Text-to-Speech service (like ElevenLabs) to convert the text into a voiceover audio file (e.g., `.mp3`). This is where the unique ID for the video is first created.

-   **`timestamp.py`**: This script figures out the exact timing of each word in the voiceover.
    -   `stt()`: This function receives the audio file from `generator.py`. It uses a Speech-to-Text AI model (OpenAI's Whisper) to analyze the audio and create a detailed list of every single word and its exact start and end time in the audio. This data is saved to `transcription.json`.

-   **`compiler.py`**: This is the final assembly line.
    -   `generate()`: This function is the grand finale. It receives:
        1.  The `background_video` choice (e.g., "minecraft").
        2.  The voiceover audio file.
        3.  The word-timing data from `transcription.json`.
    -   It uses the `moviepy` library to perform the final composition:
        - It lays the chosen background video on the bottom layer.
        - It adds the voiceover audio.
        - It adds the background music.
        - It creates and places the text subtitles on the screen, perfectly synced to the audio using the word timings.
    -   Finally, it renders and saves the final video to the `outputs/` directory.

---

### 🎬 Full Workflow from Start to Finish

1.  A user on the React frontend selects "minecraft" and types "Why cats are secretly plotting world domination." They click "Generate".
2.  The React app sends a `POST` request to the **Express server** at `http://localhost:3000/api/clips/generate`.
3.  The **Express server** receives the request, checks the data, and forwards it to the **Flask server** at `http://localhost:5000/api/generate`.
4.  The **Flask server** (`app.py`) receives the request and calls `generator.main()`.
5.  `generator.py` asks Gemini to write a script about cats plotting world domination.
6.  `generator.py` then asks ElevenLabs to turn that script into a voiceover audio file (`.mp3`). A unique ID is created.
7.  `generator.py` calls `timestamp.py` with the new audio file.
8.  `timestamp.py` uses Whisper to get the exact timing of each word and saves it to `transcription.json`.
9.  `timestamp.py` calls `compiler.py` with the audio file, the timings, and the "minecraft" video choice.
10. `compiler.py` uses `moviepy` to combine the `Minecraft.mp4` video, the voiceover, background music, and the timed subtitles into a final video file, saving it in the `outputs/` folder.
11. The final filename is returned all the way back up the chain to `app.py`.
12. `app.py` builds the final JSON response (including the URL like `http://.../outputs/final_video.mp4`) and sends it back to the **Express server**.
13. The **Express server** sends that JSON response back to the **React app**.
14. The **React app** receives the JSON, updates its state with the video URL, and displays the final video to the user.
