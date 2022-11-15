package transcode

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	//"sync"
	"testing"
)

func  TestTranscode(t *testing.T) {
	updatePath()
	fmt.Println(os.Getenv("PATH"))
    path:= `presentation_00.23.avi`
	services := &Services{}
	services.TranscodeAVIToMp4(path)

}
 

func  TestUpdatePath(t *testing.T) {
	homeDir, err := os.UserHomeDir()
	handleErr(err)
	inFilePath  := filepath.Join(homeDir, "AtnumStatic", "bin", "ffmpeg.exe")
	fmt.Println(inFilePath)
//ffmpeg -i  C:\Users\ubu\AtnumStatic\presentation_00.23.avi -c:v libx265 C:\Users\ubu\AtnumStatic\presentation_00.23.mp4
// notes audio as is, many issues for mp4 container on windows 
    cmd := exec.Command( inFilePath,  `-i`,`C:\Users\ubu\AtnumStatic\presentation_00.23.avi`, `-c:v`, `libx265`, `C:\Users\ubu\AtnumStatic\presentation_00.23.mp4` )
	cmd.Stdout = os.Stdout
    cmd.Stderr = os.Stderr
	doneChannel := make(chan bool, 1)
	go func() {
		//defer wg.Done()
		err = cmd.Start()
		handleErr(err)
	}()
	<-doneChannel
	fmt.Println("completes")

}

func updatePath() {
	homeDir, err := os.UserHomeDir()
	handleErr(err)
	path := os.Getenv("PATH")
	inFilePath  := filepath.Join(homeDir, "AtnumStatic", "ffmpeg.exe")
	updatedPath := fmt.Sprintf("%s;%s",path, inFilePath)
	os.Setenv("PATH", updatedPath)
}