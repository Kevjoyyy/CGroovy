const playButton = document.getElementById('play-button');
        const audio = document.getElementById('audio');
        const progressBar = document.getElementById('progress-bar');
        const progressFilled = document.getElementById('progress-filled');
        const currentTimeElem = document.getElementById('current-time');
        const durationElem = document.getElementById('duration');

        // Play/Pause toggle
        playButton.addEventListener('click', () => {
            if(audio.paused){
                audio.play();
                playButton.innerHTML = '&#10073;&#10073;'; // Pause icon
            } else {
                audio.pause();
                playButton.innerHTML = '&#9658;'; // Play icon
            }
        });

        // Update progress bar and time
        audio.addEventListener('timeupdate', () => {
            const percent = (audio.currentTime / audio.duration) * 100;
            progressFilled.style.width = percent + '%';
            currentTimeElem.textContent = formatTime(audio.currentTime);
        });

        // Update duration once metadata is loaded
        audio.addEventListener('loadedmetadata', () => {
            durationElem.textContent = formatTime(audio.duration);
        });

        // Reset play button icon when audio ends
        audio.addEventListener('ended', () => {
            playButton.innerHTML = '&#9658;';
        });

        // Seek functionality on progress bar
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const percent = clickX / width;
            audio.currentTime = percent * audio.duration;
        });

        // Keyboard accessibility for progress bar (left/right arrows)
        progressBar.addEventListener('keydown', (e) => {
            e.preventDefault();
            if(audio.duration){
                if(e.key === 'ArrowRight' || e.key === 'ArrowUp'){
                    audio.currentTime = Math.min(audio.currentTime + 5, audio.duration);
                } else if(e.key === 'ArrowLeft' || e.key === 'ArrowDown'){
                    audio.currentTime = Math.max(audio.currentTime - 5, 0);
                }
            }
        });

        // Format time in mm:ss
        function formatTime(seconds){
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return mins + ':' + (secs < 10 ? '0' + secs : secs);
        }