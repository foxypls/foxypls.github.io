var isTest = false;
var currentCharacter = 0;
var characterSelected = false;
var backupSave = null;
var dataDeleted = false;
var keyVersion = "A04";
var keyTest = "MI-" + keyVersion + "-" + currentCharacter + "-";
var key = "MI-" + keyVersion + "-" + currentCharacter + "-";
var disableSidebarSwipe = false;
var currentStartPage = 8;
var sidebarSwipeTimer = null;
var startingGamemode = 0;
var panVal = 0;
function disableSidebarSwipeTimer() {
    disableSidebarSwipe = true;
    clearTimeout(sidebarSwipeTimer);
    sidebarSwipeTimer = setTimeout(function() {
        disableSidebarSwipe = false;
    }, 1000);
}
function updateKeys() {
    key = getKeysForCharacter(currentCharacter);
}
function getKeysForCharacter(charID) {
    let saveKey;
    if (charID === 0) {
        saveKey = `MI-${keyVersion}`;
    } else {
        saveKey = `MI-${keyVersion}-${charID}-`;
    }
    if (isTest)
        saveKey = `MI-test-${saveKey}`;
    return saveKey;
}
function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function getItem(key) {
    let keydata = localStorage.getItem(key);
    if (keydata == "undefined")
        return undefined;
    return JSON.parse(keydata);
}
function removeItem(key) {
    localStorage.removeItem(key);
}
let firstSkillAction = true;
function saveData(vars="all") {
    if (!dataDeleted && !inCharacterSelection && (currentGamemode !== 1 || (currentGamemode === 1 && !lolYouDiedGetRekt))) {
        updateKeys();
        if (!username)
            username = "Insubordinate";
        saveTimestamp = new Date().getTime();
        const doSave = vars === "all" || (vars === "offline" && firstSkillAction);
        if (doSave) {
            localStorage.setItem(`${key}saveGame`, getCompressedSaveString());
            if (vars === "offline") {
                firstSkillAction = false;
            }
        }
    }
}
function getSaveGameOld(keyPrefix) {
    const saveGame = {};
    allVars.forEach((varName)=>{
        const data = getItem(keyPrefix + varName);
        if (data !== null && data !== undefined) {
            saveGame[varName] = data;
        } else {
            saveGame[varName] = defaultSaveValues[varName];
        }
    }
    );
    return saveGame;
}
function removeSaveOld(keyPrefix) {
    allVars.forEach((varName)=>{
        removeItem(keyPrefix + varName);
    }
    );
    console.log("Removed old local storage keys.");
}
function getLocalSave(keyPrefix) {
    let oldFormat = false;
    const saveString = localStorage.getItem(`${keyPrefix}saveGame`);
    let saveGame;
    if (saveString === null) {
        oldFormat = true;
        saveGame = getSaveGameOld(keyPrefix);
    } else {
        saveGame = getSaveFromString(saveString).saveGame;
    }
    return {
        saveGame: saveGame,
        oldFormat: oldFormat,
    };
}
function doesLocalSaveExist(keyPrefix) {
    const saveString = localStorage.getItem(`${keyPrefix}saveGame`);
    if (saveString === null) {
        if (localStorage.getItem(`${keyPrefix}skillLevel`) !== null) {
            return 1;
        } else {
            return 0;
        }
    } else {
        return 2;
    }
}
function loadData() {
    console.log("Loading Save Game...");
    let {saveGame, oldFormat} = getLocalSave(key);
    setGlobalsFromSaveGame(saveGame);
    console.log("Save Game Loaded...");
    return oldFormat;
}
function deleteData(characterID=-1) {
    let keyToUse;
    if (characterID < 0)
        keyToUse = key;
    else
        keyToUse = getKeysForCharacter(characterID);
    if (localStorage.getItem(`${keyToUse}saveGame`) !== null) {
        localStorage.removeItem(`${keyToUse}saveGame`);
    } else {
        removeSaveOld(keyToUse);
    }
    console.log("Save Game Deleted");
    dataDeleted = true;
}
function exportSave(update=false) {
    if (!update) {
        let exportSaved = getSave();
        let exportField = document.getElementById("exportSaveField");
        let exportField2 = document.getElementById("exportSaveField2");
        exportField.value = exportSaved;
        exportField2.value = exportSaved;
    } else {
        let exportSaved = getSave();
        let exportField = document.getElementById("exportSaveFieldUpdate");
        let exportField2 = document.getElementById("exportSaveFieldUpdate2");
        exportField.value = exportSaved;
        exportField2.value = exportSaved;
    }
}
function importSave(forceSaveToImport=false, characterID=-1) {
    if (characterID < 0)
        characterID = currentCharacter;
    if ($("#importSaveField").val() !== "" && !forceSaveToImport) {
        $("#import-spinner").removeClass("d-none");
        deleteData();
        resetVariablesToDefault();
        let importField = document.getElementById("importSaveField");
        let {saveGame, oldFormat} = getSaveFromString(importField.value);
        window.setTimeout(function() {
            dataDeleted = false;
            if (oldFormat) {
                for (let i = 0; i < allVars.length; i++) {
                    setItem(key + allVars[i], saveGame[allVars[i]]);
                }
                localStorage.removeItem(`${key}saveGame`);
            } else {
                localStorage.setItem(`${key}saveGame`, forceSaveToImport);
            }
            dataDeleted = true;
            location.reload();
        }, 2000);
    } else if (forceSaveToImport !== false) {
        if (forceSaveToImport === null || forceSaveToImport === undefined || forceSaveToImport === "")
            return false;
        try {
            let {saveGame, oldFormat} = getSaveFromString(forceSaveToImport);
            if (saveGame.username === null || saveGame.username === undefined)
                return false;
            let keyToUse = getKeysForCharacter(characterID);
            if (oldFormat) {
                for (let i = 0; i < allVars.length; i++) {
                    setItem(keyToUse + allVars[i], saveGame[allVars[i]]);
                }
                localStorage.removeItem(`${key}saveGame`);
            } else {
                localStorage.setItem(`${keyToUse}saveGame`, forceSaveToImport);
            }
            processLocalCharacters();
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
    return false;
}
function openImportSave(characterID=0) {
    Swal.fire({
        title: "Import Save",
        html: `<h5 class="font-w400 text-combat-smoke font-size-sm">Paste your save into the box below.</h5>
					<div class="form-group">
						<textarea class="form-control" id="import-save-character-selection" name="import-save-character-selection" rows="8" placeholder="Save goes here..." onclick="this.select();"></textarea>
					</div>`,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Import",
        customClass: {
            container: "swal-infront",
        },
    }).then((result)=>{
        if (result.value) {
            currentCharacter = characterID;
            let save = $("#import-save-character-selection").val();
            if (importSave(save, characterID)) {
                Swal.fire({
                    icon: "success",
                    title: "All done!",
                    text: "Save imported successfully.",
                    customClass: {
                        container: "swal-infront",
                    },
                });
                inCharacterSelection = true;
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops!",
                    text: "Something went wrong trying to import the save. Please double check everything was pasted correctly, and that the save is compatible with this vesion of the game.",
                    customClass: {
                        container: "swal-infront",
                    },
                });
            }
        }
    }
    );
}
function openExportSave(characterID) {
    Swal.fire({
        title: "Export Save",
        html: `<h5 class="font-w400 text-combat-smoke font-size-sm mb-1">You save is in the box below.</h5>
				<h5 class="font-w600 text-danger font-size-sm">Be sure to copy ALL of it, otherwise it will not work./</h5>
					<div class="form-group">
						<textarea class="form-control" id="export-save-character-selection" name="export-save-character-selection" rows="8" onclick="this.select();">${getSave(true, characterID)}</textarea>
					</div>`,
        showCancelButton: false,
        customClass: {
            container: "swal-infront",
        },
    });
}
function openDownloadSave(characterID) {
    let downloadSuccessful = false;
    if (characterID >= 0)
        downloadSuccessful = downloadSave(false, characterID);
    if (downloadSuccessful) {
        Swal.fire({
            icon: "success",
            title: "All done!",
            text: "Save downloaded successfully.",
            customClass: {
                container: "swal-infront",
            },
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "Something went wrong trying to download the save...",
            customClass: {
                container: "swal-infront",
            },
        });
    }
}
function openCharacterSelectionSettings(characterID=0, characterName="") {
    Swal.fire({
        title: "Save Settings",
        html: `<h5 class="font-w400 text-combat-smoke font-size-sm">${characterName}</h5>
				<button role="button" class="btn btn-alt-warning m-2 w-100" onClick="openDownloadSave(${characterID});"><i class="fa fa-file-download mr-2"></i>Download Save</button><br>
				<button role="button" class="btn btn-alt-primary m-2 w-100" onClick="openExportSave(${characterID});"><i class="fa fa-file-export mr-2"></i>Export Save</button><br>
				<button role="button" class="btn btn-alt-primary m-2 w-100" onClick="openImportSave(${characterID});" disabled><i class="fa fa-file-import mr-2"></i>Import Save (Temporarily disabled)</button><br>
				<button role="button" class="btn btn-alt-danger m-2 mt-4 w-100" onClick="accountDeletion(false, ${characterID}, '${characterName}')"><i class="fa fa-times mr-2"></i>Delete Save</button>`,
        showCancelButton: false,
        customClass: {
            container: "swal-infront",
        },
    });
}
function loadGame(update=false) {
    if (!update) {
        $("#new-update-continue-btn").html('<div class="spinner-border spinner-border-sm text-success" role="status"></div>');
        window.setTimeout(function() {
            $("#modal-export-update").modal("hide");
            if (firstTime === 1) {
                $("#modal-account-create").modal("show");
                updateWindow();
            } else {
                loadData();
                updateWindow();
            }
        }, 1000);
    } else
        $("#modal-export-update").modal("show");
}
function getSave(customKey=false, charID=0) {
    let keyPrefix = key;
    if (customKey)
        keyPrefix = getKeysForCharacter(charID);
    const saveExists = doesLocalSaveExist(keyPrefix);
    if (saveExists) {
        switch (saveExists) {
        case 1:
            return getSaveStringOld(keyPrefix);
        case 2:
            return localStorage.getItem(`${keyPrefix}saveGame`);
        }
    } else
        return "";
}
function getSaveStringOld(keyPrefix) {
    let toSave = getSaveGameOld(keyPrefix);
    const pakoSave = pako.gzip(JSON.stringify(toSave), {
        to: "string"
    });
    return btoa(pakoSave);
}
function downloadSave(backup=false, save=-1) {
    let exportSaved;
    if (!backup && save < 0)
        exportSaved = getSave();
    else if (save >= 0)
        exportSaved = getSave(true, save);
    else
        exportSaved = backupSave;
    var file = new Blob([exportSaved],{
        type: "text/plain"
    });
    if (save >= 0) {
        let keySuffix = "";
        let keyPrefix = "";
        if (isTest)
            keyPrefix = "MI-test-";
        if (save > 0)
            keySuffix = `-${save}-`;
        username = getItem(keyPrefix + "MI-A04" + keySuffix + "username");
    }
    if (window.navigator.msSaveOrOpenBlob) {
        try {
            window.navigator.msSaveOrOpenBlob(file, "melvoridlesave_" + username + ".txt");
            return true;
        } catch (e) {
            return false;
        }
    } else {
        try {
            var a = document.createElement("a")
              , url = URL.createObjectURL(file);
            a.href = url;
            a.download = "melvoridlesave_" + username + ".txt";
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
            return true;
        } catch (e) {
            return false;
        }
    }
}
function loadGameRaw(saveString) {
    let savegame = getSaveFromString(saveString).saveGame;
    setGlobalsFromSaveGame(savegame);
    saveData();
}
function setGlobalsFromSaveGame(savegame) {
    try {
        if (savegame.accountGameVersion < 110)
            updateSavePre110(savegame);
        if (savegame.accountGameVersion < 121)
            updateSavePre121(savegame);
        cleanSaveGame(savegame);
        convertOldMastery(savegame);
        newAllVars.forEach((varName)=>{
            const data = savegame[varName];
            if (data !== null && data !== undefined)
                window[varName] = data;
        }
        );
        if (savegame.serialCombat !== undefined) {
            combatManager.deserialize(savegame.serialCombat, savegame.version);
        } else {
            combatManager.convertFromOldSaveFormat(savegame);
        }
    } catch (e) {
        removeForceReload();
        $("#m-page-loader").attr("class", "d-none");
        $("#game-broke-error-msg").val(e.stack);
        $("#modal-game-broke").modal("show");
        console.log(e);
    }
}
function getSaveJSON(save) {
    try {
        const unpako = atob(save);
        let savegame;
        try {
            savegame = JSON.parse(pako.ungzip(unpako, {
                to: "string"
            }));
        } catch (e) {
            savegame = unpako;
        }
        return savegame;
    } catch (e) {
        return "";
    }
}
function confirmLoadLocalSave() {
    $("#modal-cloud-save-buttons").addClass("d-none");
    $("#load-save-spinner").removeClass("d-none");
    setTimeout(function() {
        updateWindow(true);
        startCloudSync();
        $("#modal-cloud-save").modal("hide");
        updateOffline();
        confirmedLoaded = true;
    }, 100);
}
function fixMySave(confirmed=false) {
    $("#save-fix-spinner").removeClass("d-none");
    console.log("Attempting to fix your save... wish me luck");
    for (let i = 0; i < bank.length; i++) {
        if (bank[i] === null) {
            bank.splice(i, 1);
            console.log("Found invalid bank item, removed.");
        }
    }
    saveData();
    let save = getSave();
    const unpako = atob(save);
    const savegame = JSON.parse(pako.ungzip(unpako, {
        to: "string"
    }));
    for (let i = 0; i < allVars.length; i++) {
        if (savegame[allVars[i]] !== null && savegame[allVars[i]] !== undefined)
            window[allVars[i]] = savegame[allVars[i]];
    }
    saveData();
    console.log("Save fix completed... refreshing...");
    window.setTimeout(function() {
        location.reload();
    }, 2000);
}
function setBackupSaveDetails(save) {
    if (save !== null) {
        const unpako = atob(save);
        let savegame;
        try {
            savegame = JSON.parse(pako.ungzip(unpako, {
                to: "string"
            }));
        } catch (e) {
            savegame = unpako;
        }
        let version = savegame.gameUpdateNotification;
        $("#settings-backup-save-version").text(version);
        $("#exportBackupSaveField").val(backupSave);
    }
}
function getItemFromSave(saveString, varName) {
    let unpako;
    try {
        unpako = atob(saveString);
    } catch (e) {
        return undefined;
    }
    let savegame;
    try {
        savegame = getSaveFromString(saveString).saveGame;
    } catch (e) {
        try {
            savegame = JSON.parse(unpako);
        } catch (e) {
            return undefined;
        }
    }
    let keydata = savegame[varName];
    if (keydata == "undefined")
        return undefined;
    return keydata;
}
function setForceReload(character, reloadNow=false) {
    console.log("set force reload to " + character);
    setItem("MI-forceReload-", character);
    dataDeleted = true;
    if (reloadNow) {
        resetEntirePage(isTest);
    }
}
function removeForceReload() {
    removeItem("MI-forceReload-");
}
function onloadEvent(accessCheck=true, resetPage=true) {
    if (resetPage) {
        resetEntirePage(isTest);
    } else {
        let errorNum = 0;
        try {
            connectingToCloud = false;
            updateKeys();
            $(".cloud-connection-status-text").removeClass("text-danger");
            $(".cloud-connection-status-text").removeClass("text-success");
            $(".btn-cloud-sign-in").addClass("d-none");
            if (isTest && accessCheck) {
                if (!confirmedLoaded)
                    $("#m-page-loader-test").attr("class", "show");
                $("#m-page-loader").attr("class", "d-none");
                let forceLoad = true;
                if (getItem("MI-forceReload-") === undefined || getItem("MI-forceReload-") === null)
                    forceLoad = false;
                checkTestAccessInit(forceLoad, accessCheck);
            } else {
                errorNum = 4;
                let CSAV;
                if (getItem("CSAV") === undefined || getItem("CSAV") === null)
                    CSAV = 2;
                else
                    CSAV = getItem("CSAV");
                if (CSAV < characterSelectAnnouncementVersion) {
                    $("#character-selection-page-8").removeClass("d-none");
                    $("#character-selection-page-0").addClass("d-none");
                    currentStartPage = 8;
                    setItem("CSAV", characterSelectAnnouncementVersion);
                } else {
                    $("#character-selection-page-8").addClass("d-none");
                    $("#character-selection-page-0").removeClass("d-none");
                    currentStartPage = 0;
                }
                if (getItem("MI-forceReload-") === undefined || getItem("MI-forceReload-") === null) {
                    errorNum = "7a";
                    loadCharacterSelection(false);
                    errorNum = "7b";
                    $("#m-page-loader").attr("class", "d-none");
                } else {
                    if (isTest)
                        $("#m-page-loader-test").attr("class", "d-none");
                    characterLoading = false;
                    selectCharacter(parseInt(getItem("MI-forceReload-")), true);
                }
                errorNum = 8;
                $("#dropdown-content-custom-amount").bind("keyup input change", function() {
                    let customQty = $("#dropdown-content-custom-amount").val();
                    $("#dropdown-content-custom-amount-1").val(customQty);
                    $("#dropdown-content-custom-amount-2").val(customQty);
                    if (Number.isInteger(+customQty) && customQty > 0)
                        updateBuyQty(customQty);
                });
                $("#dropdown-content-custom-amount-1").bind("keyup input change", function() {
                    let customQty = $("#dropdown-content-custom-amount-1").val();
                    $("#dropdown-content-custom-amount").val(customQty);
                    $("#dropdown-content-custom-amount-2").val(customQty);
                    if (Number.isInteger(+customQty) && customQty > 0)
                        updateBuyQty(customQty);
                });
                $("#dropdown-content-custom-amount-2").bind("keyup input change", function() {
                    let customQty = $("#dropdown-content-custom-amount-2").val();
                    $("#dropdown-content-custom-amount").val(customQty);
                    $("#dropdown-content-custom-amount-1").val(customQty);
                    if (Number.isInteger(+customQty) && customQty > 0)
                        updateBuyQty(customQty);
                });
                errorNum = 9;
                $("#searchTextbox").keyup(function() {
                    let search = $("#searchTextbox").val();
                    updateBankSearch(search);
                    if (search === "wherearemylemons")
                        addItemToBank(CONSTANTS.item.Lemon, 1);
                    else if (search === "8") {
                        if (!eightSeconds) {
                            addItemToBank(CONSTANTS.item.Eight, 1);
                            eightSeconds = true;
                            window.setTimeout(function() {
                                eightSeconds = false;
                            }, 8000);
                        }
                    }
                });
                $("#summoning-synergy-search").keyup(function() {
                    let search = $("#summoning-synergy-search").val();
                    updateSummoningSynergySearch(search);
                });
                errorNum = 10;
                if (isTest)
                    $("#test-env").removeClass("d-none");
                ifvisible.on("blur", function() {
                    if (confirmedLoaded && pauseOfflineActions && !isGolbinRaid && location.origin !== "https://steam.melvoridle.com") {
                        offlinePause = true;
                        pauseOfflineAction(offline.skill);
                    }
                });
                ifvisible.on("focus", function() {
                    if (confirmedLoaded && pauseOfflineActions && !isGolbinRaid && location.origin !== "https://steam.melvoridle.com") {
                        if (offline.skill !== CONSTANTS.skill.Hitpoints)
                            offlineCatchup();
                        offlinePause = false;
                        offlineActionIsPaused = false;
                    }
                });
                errorNum = 11;
                $(document).bind("keypress", function(e) {
                    if (e.keyCode == 56) {
                        if (!eightSeconds) {
                            addItemToBank(CONSTANTS.item.Eight, 1);
                            eightSeconds = true;
                            window.setTimeout(function() {
                                eightSeconds = false;
                            }, 8000);
                        }
                    }
                });
                $(window).bind("beforeunload", function(event) {
                    if (isGolbinRaid)
                        raidManager.stopCombat();
                    if (!SETTINGS.general.enabledOfflineCombat && characterSelected) {
                        if (combatManager.isInCombat)
                            combatManager.stopCombat();
                    }
                    if (!dataDeleted && characterSelected && (getItem("MI-forceReload-") === undefined || getItem("MI-forceReload-") === null)) {
                        saveData();
                    }
                    if (confirmationOnClose && location.origin !== "https://steam.melvoridle.com/")
                        return "You have some unsaved changes";
                });
                $(document).scroll(function() {
                    handleBankSidebarScroll();
                });
                errorNum = 12;
                $("body").on("swipeleft", function() {
                    let mq = checkMediaQuery("(max-width: 991px)");
                    if (mq && itemBeingDragged < 0)
                        One._uiApiLayout("sidebar_close");
                });
                $("body").on("swiperight", function() {
                    let mq = checkMediaQuery("(max-width: 991px)");
                    if (mq && itemBeingDragged < 0)
                        One._uiApiLayout("sidebar_open");
                });
            }
        } catch (e) {
            $("#on-load-error").html("<span class='font-w700'>An error has occured loading the game:<br><br>" + e.message + "<br>" + e.stack);
        }
    }
}
window.onload = function() {
    if (location.origin === "https://test.melvoridle.com")
        isTest = true;
    onloadEvent(isTest, false);
}
;
function resetEntirePage(accessCheck=true, startCombatLoad=true) {
    $("#page-container").load("pageContainer.php", function() {
        loadCombat();
        onloadEvent(accessCheck, false);
    });
}
function handleBankSidebarScroll() {
    let wrapper = $("#bank-item-wrapper");
    let box = $("#bank-item-box");
    let offsetTop = -wrapper.offset().top + $(window).scrollTop();
    let offsetBottom = wrapper.offset().top - $(window).scrollTop() + wrapper.outerHeight() - box.outerHeight();
    if (offsetBottom > 0 && offsetTop < 0) {
        box.css({
            top: 0,
        });
    } else if (offsetBottom > 0 && offsetTop > 0) {
        box.css({
            top: offsetTop + "px",
        });
    } else {
        box.offset({
            top: $(window).scrollTop() + offsetBottom,
        });
    }
}
function changePageCharacterSelection(page) {
    if (currentStartPage !== page) {
        $("#character-selection-page-" + currentStartPage).attr("class", "d-none animated fadeOutRight");
        $("#character-selection-page-" + page).attr("class", "w-100 animated fadeInRight");
        currentStartPage = page;
        if (page !== 0 && page !== 5) {
            $(".btn-cloud-sign-in").addClass("d-none");
            $(".btn-cloud-sign-in-back").removeClass("d-none");
        } else {
            if (!connectedToCloud)
                $(".btn-cloud-sign-in").removeClass("d-none");
            $(".btn-cloud-sign-in-back").addClass("d-none");
        }
        if (page === 1)
            enableLoginForm();
        if (page === 3) {
            $("#gamemode-selection").html(createGamemodeSelectionElements());
            for (let i = 0; i < Object.keys(GAMEMODES).length; i++) {
                $("#gamemode-select-btn-" + i).mouseover(function() {
                    $("#gamemode-select-bg-" + i).addClass("opacity-40");
                });
                $("#gamemode-select-btn-" + i).mouseleave(function() {
                    $("#gamemode-select-bg-" + i).removeClass("opacity-40");
                });
            }
        }
    }
}
function setStartingGamemode(gamemode) {
    startingGamemode = gamemode;
    $("#gamemode-selection-text").html(`<img class="skill-icon-xs mr-2" src="${GAMEMODES[gamemode].media}">${GAMEMODES[gamemode].name}`);
}
function resetVariablesToDefault() {
    newAllVars.forEach((varName)=>{
        window[varName] = defaultSaveValues[varName];
    }
    );
}
