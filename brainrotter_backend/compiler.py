# import moviepy.config as mpyconf
# mpyconf.change_settings({"IMAGEMAGICK_BINARY": "/opt/homebrew/bin/magick"})

from moviepy.editor import (
    VideoFileClip,
    AudioFileClip,
    TextClip,
    CompositeVideoClip,
    CompositeAudioClip
)


from datetime import datetime
import os
import json
import sys

timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")



#mpy_config.IMAGEMAGICK_BINARY = r"/opt/homebrew/bin/magick"

def get_music_path():
    print("1. CFC Music")
    print("2. Better call saul Background Music")
    print("3. Other")
    choice = int(input("Choose a background music option (1-3): "))
    match choice:
        case 1:
            return "background_music/Clipped_cfc.mp3"
        case 2:
            return "background_music/bcs.mp3"
        case 3:
            custom_path = input("Enter the path to your custom background music file: ")
            if os.path.exists(custom_path):
                return custom_path
            else:
                print("Invalid path. Using default CFC music.")
                return "background_music/Clipped_cfc.mp3"
        case _:
            print("Invalid choice. Using default CFC music.")
            return "background_music/Clipped_cfc.mp3"
        

def generate(transcription_obj, filename, background_video_name): 
    
    background_video_path = ""
    match background_video_name:
        case "minecraft":
            background_video_path = "background_vids/Minecraft.mp4"
        case "subway_surfers":
            background_video_path = "background_vids/subwaysurf.mp4"
        case "gta_v":
            background_video_path = "background_vids/gta.mp4"
        case _:
            # Default case if no match is found
            background_video_path = "background_vids/Minecraft.mp4"

    voiceover_audio_path = filename # Path for AI voiceover
    background_music_path = "background_music/Clipped_cfc.mp3" # Background music path
    output_path = f"outputs/output_{timestamp}.mp4" # Final output path inside outputs/ directory
    background_video = VideoFileClip(background_video_path) # Making the background video a clip
    voiceover_audio = AudioFileClip(voiceover_audio_path) # Making the audio file a clip
    
    bg_clip = AudioFileClip(background_music_path)
    duration = min(bg_clip.duration, voiceover_audio.duration)
    background_music = bg_clip.subclip(0, duration)# Cutting the background music to match the duration of the voiceover
    background_video = background_video.loop(duration=voiceover_audio.duration) # Doing the same for the background_video
    

    subtitle_clips = [] # subtitles list


    lines = split_obj_into_lines(transcription_obj)
    for i, line in enumerate(lines): # Splitting the transcription object into lines
        text = line["text"].strip()  # Getting the text from the line
        start = line["start"]  # Getting the start time of the line
        end = line["end"]  # Getting the end time of the line
        if not text or end <= start:
            continue
        txt_clip = TextClip(
            text,
            fontsize=70,
            color="white",
            font="Arial-Bold",
            stroke_color="black",
            stroke_width=2
        ).set_position("center").set_start(start).set_duration(end - start) # Making the text clip, and placing it in the center of the screen with the appropriate font
        subtitle_clips.append(txt_clip)  # Adding it to the subtitle list
  
    final_audio = CompositeAudioClip(
        [voiceover_audio, background_music.volumex(0.3)]  # Reducing the volume of the background music in order to make the voiceover more prominent
    )
    final_video = CompositeVideoClip([background_video] + subtitle_clips)  # Compiling the subtitles and the background video
    final_video = final_video.set_audio(final_audio)  # Adding the final audio, and we're done :party:
    final_video.write_videofile(
        output_path,
        codec="libx264",
        audio_codec="aac",
        fps=background_video.fps
        )
    os.remove(filename)
    return output_path
    
def split_obj_into_lines(transcription_obj):
    max_chars = 16
    max_gap = 1.5
    max_duration = 2
    lines = []
    line = {}
    cur_length = 0
    cur_duration = 0
    gap = 0
    start_line = 0
    words = transcription_obj.words
    i = 0
    min_gap = 0.035
    with open('transcription.json', 'r') as f:
        obj = json.load(f)

        while i < len(words):
            word = words[i]
            word_text = word.word.strip()
            gap = word.start - (words[i-1].end if i > 0 else 0)
            
            if (cur_duration >= max_duration or cur_length >= max_chars or gap > max_gap) and line and not (gap < 0):
                lines.append(line)
                line = {}
                cur_length = 0
                cur_duration = 0
                start_line = 0
                continue

            if not line:
                line = {
                    "start": word.start,
                    "end": word.end,
                    "text": word_text
                }
                start_line = word.start
                cur_duration = word.end - word.start
                cur_length = len(line["text"])
            else:
                line["text"] += " " + word_text
                line["end"] = word.end
                cur_duration = word.end - start_line
                cur_length += len(line["text"])
            i += 1  # Only increment when word has been processed

    if line:
        lines.append(line)



    return lines


if __name__ == "__main__":
    with open("transcription.json", "r") as f:
        transcription_obj = json.load(f)
        if not transcription_obj:
            print("No transcription data found.")
            sys.exit(1)
    generate(transcription_obj, "output_with_subtitles_23710f50a61d4e42be6653468e45f767.mp4")




    