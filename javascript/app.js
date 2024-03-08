
        const mySongs = [
            { "Singer": "By Cho Tokimeki♡Sendenbu", "Poster": "images/1pic.jpg", "songTitle": "Kawaii Memorial", "Song": "songs/song1.mp3" },
            { "Singer": "By HoneyWorks", "Poster": "images/2pic.jpg", "songTitle": "Kawaii Gomain", "Song": "songs/song2.mp3" },
            { "Singer": "By Fifty Fifty", "Poster": "images/3pic.jpg", "songTitle": "Cupid", "Song": "songs/song3.mp3" },
            { "Singer": "By Melanie Martinez", "Poster": "images/4pic.jpg", "songTitle": "Play Date", "Song": "songs/song4.mp3" },
            { "Singer": "by Doja Cat", "Poster": "images/5pic.jpg", "songTitle": "Agora Hills ", "Song": "songs/song5.mp3" }
        ];

        let currentSongIndex = 0;
        const audioPlayer = new Audio(mySongs[currentSongIndex].Song);
        const playPauseButton = document.getElementById('playPauseButton');
        const customRange = document.getElementById('customRange1');
        const timeDisplay = document.getElementById('timeDisplay');
        const posterImage = document.getElementById('poster');
        const songTitleElement = document.getElementById('songTitle');
        const singerElement = document.getElementById('singer');

        function playPause() {
            if (audioPlayer.paused || audioPlayer.ended) {
                playAudio();
                playPauseButton.dataset.playing = "true";
            } else {
                pauseAudio();
                playPauseButton.dataset.playing = "false";
            }
        }

        // Add a listener to update the button icon when the song ends
        audioPlayer.addEventListener('ended', () => {
            playPauseButton.dataset.playing = "false";
        });

        // Update the play/pause button icon based on the current state
        audioPlayer.addEventListener('playing', () => {
            playPauseButton.innerHTML = '<i class="fa fa-pause"></i>';
        });

        audioPlayer.addEventListener('pause', () => {
            playPauseButton.innerHTML = '<i class="fa fa-play"></i>';
        });

        function playAudio() {
            audioPlayer.play();
            calculateSongDuration(); // Update timer when playing
            updateSongInfo();
        }

        function pauseAudio() {
            audioPlayer.pause();
        }

        function stop() {
            pauseAudio();
            audioPlayer.currentTime = 0;
        }

        function nextSong() {
            const nextIndex = currentSongIndex + 1;
            if (nextIndex < mySongs.length) {
                currentSongIndex = nextIndex;
                changeSong();
            } else {
                document.getElementById('alert').innerHTML = "No next song available";
                console.log('No next song available');
				setTimeout(() => {
						  document.getElementById('alert').innerHTML ="";
						}, 2000);
            }
        }

        function previousSong() {
            const prevIndex = currentSongIndex - 1;
            if (prevIndex >= 0) {
                currentSongIndex = prevIndex;
                changeSong();
            } else {
                document.getElementById('alert').innerHTML = "No previous song available";
                console.log('No previous song available');
								setTimeout(() => {
						  document.getElementById('alert').innerHTML ="";
						}, 2000);
            }
        }

        function changeSong() {
            audioPlayer.src = mySongs[currentSongIndex].Song;
            playAudio();
        }

        function updateSongInfo() {
            posterImage.src = mySongs[currentSongIndex].Poster;
            songTitleElement.textContent = mySongs[currentSongIndex].songTitle;
            singerElement.textContent = mySongs[currentSongIndex].Singer;
        }

        function calculateSongDuration() {
            audioPlayer.addEventListener('timeupdate', () => {
                const currentTimeMinutes = Math.floor(audioPlayer.currentTime / 60);
                const currentTimeSeconds = Math.floor(audioPlayer.currentTime % 60);
                const currentTimeString = `${currentTimeMinutes}:${currentTimeSeconds < 10 ? '0' : ''}${currentTimeSeconds}`;

                const durationMinutes = Math.floor(audioPlayer.duration / 60);
                const durationSeconds = Math.floor(audioPlayer.duration % 60);
                const durationString = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;

                timeDisplay.innerHTML = `
                <div class="1">${currentTimeString}</div>
                <div class="1">${durationString}</div>
            `;
            });
        }

        // Update range input value and max duration on timeupdate
        audioPlayer.addEventListener('timeupdate', () => {
            customRange.value = audioPlayer.currentTime;
            customRange.max = audioPlayer.duration;
        });

        // Seek functionality when the user changes the range input
        customRange.addEventListener('input', () => {
            audioPlayer.currentTime = customRange.value;
        });

        // Load the first song when the page loads
        changeSong();
