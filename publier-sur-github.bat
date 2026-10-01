@echo off
chcp 65001 > nul
echo ===================================================
echo   🥚 PUBLICATION DU SITE SUR GITHUB PAGES
echo ===================================================
echo.
echo 1. Si ce n'est pas deja fait, creez un depot vide sur :
echo    https://github.com/new
echo    (Exemple de nom : egg-incremental-site)
echo.
set /p REPO_URL="2. Collez l'URL de votre depot GitHub (ex: https://github.com/pseudo/depot.git) : "

if "%REPO_URL%"=="" (
    echo Aucune URL fournie. Annulation.
    pause
    exit /b
)

echo.
echo Configuration du depot distant...
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git branch -M main

echo Envoi du code sur GitHub...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===================================================
    echo   [SUCCES] Code envoye avec succes sur GitHub !
    echo ===================================================
    echo.
    echo Pour activer le site en ligne :
    echo 1. Allez sur votre depot GitHub -> "Settings" -> "Pages"
    echo 2. Dans "Build and deployment", sous "Source", selectionnez "GitHub Actions"
    echo 3. Votre site sera publie automatiquement sous quelques minutes !
    echo.
) else (
    echo.
    echo [ATTENTION] Verifiez vos identifiants GitHub ou les permissions du depot.
)

pause
