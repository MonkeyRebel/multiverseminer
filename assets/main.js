// Create components
var game = new Game();
var ui = new UI();

// Initialize notification window
$.noty.defaults.layout = 'bottomRight';
$.noty.defaults.timeout = 3000;

// Initialize tooltip
$(document).tooltip();

// Add hook for document ready
$(document).ready(onDocumentReady);

// Setup key bindings
Mousetrap.bind('d', function(e) {
   onMine();
});
Mousetrap.bind('g', function(e) {
   onGather();
});
Mousetrap.bind('s', function(e) {
   onSave();
});
Mousetrap.bind('r', function(e) {
   onReset();
});

// ---------------------------------------------------------------------------
// function hooks
// ---------------------------------------------------------------------------
function onDocumentReady() {
    // Initialize the crafting accordion
    $("#playerCraftingContent").accordion();

    //Initialize components
    game.init();
    ui.init();
    
    // Call one round of UI Updates
    ui.update();
    
    // Activate the default panels
    onActivatePlayerInventory();
    onActivatePlayerGear();
    
    // Set the update interval
    var interval = 1000 / 60;
    setInterval(function() {
        onUpdate();
    }, interval);
};

function onUpdate() {
    var currentTime = Date.now();
    
	game.update(currentTime);
	ui.update(currentTime);
};

function onCraft(what) {
	if (what == undefined) {
		utils.logError("onCraft with invalid target");
		return;
	}

	if (game.player.craft(what)) {
		ui.updateCraftingPanel();
	}
};

function onMine() {
	game.settings.addStat('mineCount');
	game.player.mine();
};

function onGather() {
	game.settings.addStat('gatherCount');
	game.player.gather();
};

function onActivatePlayerInventory() {
	// select the button
	changeLeftCategoryButton(0);

    // disable and hide
    ui.hideLeftSideComponents();

    // activate the category
    ui.showComponent(ui.componentPlayerInventory);
}

function onActivateCrafting() {
	// select the button
	changeLeftCategoryButton(1);
		
    // disable and hide
    ui.hideLeftSideComponents();
    
    // activate the category
    ui.showComponent(ui.componentCrafting);
};

function onActivatePlayerGear() {
	// select the button
	changeRightCategoryButton(0);
	
    ui.hideRightSideComponents();
    
    // activate the category
    ui.showComponent(ui.componentPlayerGear);
}

function onActivateElementFinder() {
	// select the button
	changeRightCategoryButton(1);
	
    ui.hideRightSideComponents();
    
    // activate the category
    ui.showComponent(ui.componentElementFinder);
}

function onSave() {
	game.save();

	ui.notify("Game saved");
}

function onReset() {
	noty({
		text : 'Are you sure you want to reset?',
		type : 'confirmation',
		buttons : [ {
			text : 'Ok',
			onClick : function($noty) {
				$noty.close();
				game.reset();
				//TODO: Add reset function to ui
//				ui.reset();
				
				onActivatePlayerInventory();
				onActivatePlayerGear();
			}
		}, {
			text : 'Cancel',
			onClick : function($noty) {
				$noty.close();
			}
		} ]
	});
}

function onSetInventoryFilter(filter) {
	ui.inventoryPlayerCategoryFilter = filter;
	
	ui.updateComponent(ui.componentPlayerInventory);
}

function changeLeftCategoryButton(selected) {
	for(var i = 0; i < 4; i++)
	{
		var name = document.getElementById("leftCategory" + i);
		name.className="genericButton categoryButton clickable";
    }
	
	var name = document.getElementById("leftCategory" + selected);
	name.className="genericButtonSelected categoryButton clickable";
}
function changeRightCategoryButton(selected) {
	for(var i = 0; i < 4; i++)
	{
		var name = document.getElementById("rightCategory" + i);
		name.className="genericButton categoryButton clickable";
    }
	
	var name = document.getElementById("rightCategory" + selected);
	name.className="genericButtonSelected categoryButton clickable";
}