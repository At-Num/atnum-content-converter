set CURRENT_DIR=%cd%
@echo off
if not exist %userprofile%\AtnumStatic\bin\ mkdir %userprofile%\AtnumStatic\bin\
copy %CURRENT_DIR%\bin\*.* %userprofile%\AtnumStatic\bin\ 

SETLOCAL ENABLEDELAYEDEXPANSION
SET LinkName=ContentConverter
SET Esc_LinkDest=%%HOMEDRIVE%%%%HOMEPATH%%\Desktop\!LinkName!.lnk
SET Esc_LinkTarget=!CURRENT_DIR!\atnum-content-converter.exe
SET Esc_LinkTargetDir=!CURRENT_DIR!
:: SET Esc_LinkIcon=!CURRENT_DIR!\build\windows\icon.ico
SET cSctVBS=CreateShortcut.vbs
SET LOG=".\%~N0_runtime.log"
((
  echo Set oWS = WScript.CreateObject^("WScript.Shell"^) 
  echo sLinkFile = oWS.ExpandEnvironmentStrings^("!Esc_LinkDest!"^)
  echo Set oLink = oWS.CreateShortcut^(sLinkFile^) 
  echo oLink.TargetPath = oWS.ExpandEnvironmentStrings^("!Esc_LinkTarget!"^)
  echo oLink.WorkingDirectory = oWS.ExpandEnvironmentStrings^("!Esc_LinkTargetDir!"^)
::  echo oLink.IconLocation = oWS.ExpandEnvironmentStrings^("!Esc_LinkIcon!"^)
  echo oLink.Save
)1>!cSctVBS!
cscript //nologo .\!cSctVBS!
DEL !cSctVBS! /f /q
)1>>!LOG! 2>>&1


pause
