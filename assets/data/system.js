// ---------------------------------------------------------------------------
// General system variables and data
// ---------------------------------------------------------------------------
var sys = new System();

function System() {	
    this.imageRoot = "assets/images/";
    this.iconRoot = this.imageRoot + "itemIcons/";
    
    this.enableDragDrop = true; // too buggy right now to leave this enabled
    this.dragDelay = 300; // delay before starting to drag
    
    this.floatFadeDelay = 300; // delay for floating windows to fade on close 
    
    // Selection control
    this.selectionArrowBack = this.imageRoot + 'selectionArrowBack.png';
    this.selectionArrowBackFast = this.imageRoot + 'selectionArrowBackFast.png';
    this.selectionArrowForward = this.imageRoot + 'selectionArrowForward.png';
    this.selectionArrowForwardFast = this.imageRoot + 'selectionArrowForwardFast.png';
    
    // Icons
    this.iconPlaceholder = this.iconRoot + 'icon_placeholder.png';
    this.iconPlaceholderRawMaterial = this.iconRoot + 'icon_placeholderRawMaterial.png';
    this.iconPlaceholderGem = this.iconRoot + 'icon_placeholderGem.png';
    this.iconPlaceholderChest = this.iconRoot + 'icon_placeholderGearChest.png';
    this.iconPlaceholderHead = this.iconRoot + 'icon_placeholderGearHelmet.png';
};