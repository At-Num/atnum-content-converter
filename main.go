package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"contentConverter/backend/transcode"
)

//go:embed all:frontend/dist
//go:embed icon.jpeg
var assets embed.FS

func main() {
	gicon, _ := assets.ReadFile("icon.jpeg")
	// Create an instance of the app structure
	services := &transcode.Services{}
	services.GIcon = gicon

	// Create application with options
	err := wails.Run(&options.App{
		Title:            "atnum-content-converter",
		Width:            640,
		Height:           384,
		Assets:           assets,
		BackgroundColour: &options.RGBA{R: 254, G: 254, B: 254, A: 1},
		OnStartup:        services.Startup,
		Bind: []interface{}{
			services,
		},
		LogLevel: 1 ,
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
