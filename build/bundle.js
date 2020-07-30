/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./build/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n//const DisplayFilter = require(\"./DisplayFilter.js\");\n\nlet directoryPath = \".\";\n// Application logic will begin once DOM content is loaded\nwindow.onload = () => {\n  const app = new main();\n};\nclass main {\n  constructor() {\n    // Initialize a Map to quickly reference nodeId -> external app data\n    // The Map will be populated when a model is loaded\n    this._modelData = new Map();\n    // Instantiate the viewer\n    this._viewer = new Communicator.WebViewer({\n      containerId: \"viewer\",\n      empty: true\n    });\n    // The display filter class will help manage filtered nodes from UI choices\n    this._displayFilter = new DisplayFilter(this._viewer);\n    this._viewer.start();\n    this._viewer.setCallbacks({\n      modelStructureReady: () => {\n        // Background color for viewers\n        this._viewer.view.setBackgroundColor(new Communicator.Color(100, 150, 200), new Communicator.Color(222, 222, 222));\n        // Additional viewer options\n        this._viewer.view.getAxisTriad().enable();\n        this._viewer.view.getNavCube().enable();\n        this._viewer.view.getNavCube().setAnchor(Communicator.OverlayAnchor.LowerRightCorner);\n        let loadButton = document.getElementById(\"open-model-button\");\n        loadButton.disabled = false;\n      },\n      selectionArray: selectionEvents => {\n        if (selectionEvents.length == 0) {\n          document.getElementById(\"node-id\").innerHTML = \"--\";\n          document.getElementById(\"node-name\").innerHTML = \"--\";\n          document.getElementById(\"inv-manufacturer\").innerHTML = \"--\";\n          document.getElementById(\"inv-select-cost\").innerHTML = \"--\";\n          document.getElementById(\"inv-total-stock\").innerHTML = \"--\";\n          document.getElementById(\"inv-avail-stock\").innerHTML = \"--\";\n          document.getElementById(\"inv-claimed\").innerHTML = \"--\";\n          document.getElementById(\"inv-location\").innerHTML = \"--\";\n          return;\n        }\n        // Otherwise, display node information for the first node in the selection array\n        const nodeId = selectionEvents[0].getSelection().getNodeId();\n        document.getElementById(\"node-id\").innerHTML = nodeId.toString() || \"Unknown\";\n        document.getElementById(\"node-name\").innerHTML = this._viewer.model.getNodeName(nodeId) || \"Node Name Not Defined\";\n        // If the selection nodeId is found in the application data, populate the inspector fields\n        if (this._modelData.has(nodeId)) {\n          let nodeData = this._modelData.get(nodeId);\n          document.getElementById(\"inv-manufacturer\").innerHTML = nodeData.Manufacturer;\n          document.getElementById(\"inv-select-cost\").innerHTML = `$ ${nodeData.Price.toFixed(2)}`;\n          document.getElementById(\"inv-total-stock\").innerHTML = nodeData.Stock.toString();\n          document.getElementById(\"inv-avail-stock\").innerHTML = (nodeData.Stock - nodeData.Reserved).toString();\n          document.getElementById(\"inv-claimed\").innerHTML = nodeData.Reserved.toString();\n          document.getElementById(\"inv-location\").innerHTML = nodeData.Location;\n        }\n      }\n    }); // End Callbacks\n    this.setEventListeners();\n    this.updateModelList();\n  } // End app Constructor\n  //Function to preload model files to be accessed through thumbnails\n  updateModelList() {\n    const thumbnailElements = document.getElementsByClassName(\"model-thumb\");\n    for (let thumbnail of thumbnailElements) {\n      let thumbnailElement = thumbnail;\n      thumbnailElement.onclick = e => {\n        e.preventDefault();\n        let elem = e.currentTarget;\n        let modelToLoad = elem.getAttribute(\"model\");\n        // Load the model into the scene when clicked\n        this.loadModel(modelToLoad);\n      };\n    }\n  }\n  // Function to load models and query any associated application data\n  loadModel(modelName) {\n    this._viewer.model.clear().then(() => {\n      const nodeName = \"Model-\" + modelName;\n      const modelNodeId = this._viewer.model.createNode(null, nodeName);\n      this._viewer.model.loadSubtreeFromScsFile(modelNodeId, directoryPath + \"/data/\" + modelName + \".scs\").then(() => {\n        this._viewer.view.fitWorld();\n        // Get the application data and map each NodeID as a key, and the rest of its data as a value\n        fetch(directoryPath + \"/data/database/\" + modelName + \".json\").then(resp => {\n          if (resp.ok) {\n            resp.json().then(data => {\n              let nodeData = data.NodeData;\n              let numEntries = nodeData.length;\n              let clippedID;\n              let totalCost = 0;\n              this._modelData.clear();\n              for (let i = 0; i < numEntries; ++i) {\n                clippedID = nodeData[i].ID;\n                this._modelData.set(clippedID, nodeData[i]);\n                totalCost += nodeData[i].Price;\n              }\n              // Display the total cost of the assembly\n              document.getElementById(\"inv-total-cost\").innerHTML = `$ ${totalCost.toFixed(2)}`;\n              this._displayFilter.captureNativeColors(this._modelData);\n              this._displayFilter.gatherFilteredNodes(this._modelData);\n              this._displayFilter.updateColorGradients(this._modelData);\n              this._displayFilter.setRenderingSelection();\n            });\n          } else {\n            alert(\"No JSON data for this Model was found.\");\n          }\n        });\n        // Get and set the rest of the model level info\n        const modelRoot = this._viewer.model.getNodeChildren(modelNodeId)[0];\n        const modelFileName = this._viewer.model.getModelFileNameFromNode(modelRoot);\n        const modelFileFormat = this._viewer.model.getModelFileTypeFromNode(modelRoot);\n        document.getElementById(\"model-file-name\").innerHTML = modelFileName || \"N/A\";\n        document.getElementById(\"model-file-type\").innerHTML = Communicator.FileType[modelFileFormat] || \"N/A\";\n      });\n    });\n  }\n  sliderOnInput(slider) {\n    this._displayFilter.updateSliderRange(slider);\n    this._displayFilter.updateSliderLabels(slider);\n    this._displayFilter.gatherFilteredNodes(this._modelData);\n    this._displayFilter.setRenderingSelection();\n  }\n  setEventListeners() {\n    document.getElementById(\"psMinSlider\").oninput = () => {\n      this.sliderOnInput(\"psMin\");\n    };\n    document.getElementById(\"psMaxSlider\").oninput = () => {\n      this.sliderOnInput(\"psMax\");\n    };\n    document.getElementById(\"ssMinSlider\").oninput = () => {\n      this.sliderOnInput(\"ssMin\");\n    };\n    document.getElementById(\"ssMaxSlider\").oninput = () => {\n      this.sliderOnInput(\"ssMax\");\n    };\n    document.getElementById(\"open-model-button\").onclick = () => {\n      // Proxy to override the default behavior of file input type\n      document.getElementById(\"file-input\").click();\n    };\n    document.getElementsByName(\"displaymode\").forEach(element => {\n      let inputElement = element;\n      inputElement.onclick = () => {\n        this._displayFilter.setFilterSelection(inputElement.id);\n        this._displayFilter.gatherFilteredNodes(this._modelData);\n        this._displayFilter.setRenderingSelection();\n      };\n    });\n    document.getElementsByName(\"gradientmode\").forEach(element => {\n      let inputElement = element;\n      inputElement.onclick = () => {\n        this._displayFilter.setGradientSelection(inputElement.id);\n        this._displayFilter.setRenderingSelection();\n      };\n    });\n    let compButtons = document.getElementById(\"companyFilter\").getElementsByClassName(\"companyFilterButton\");\n    for (let element of compButtons) {\n      let htmlelement = element;\n      htmlelement.onclick = () => {\n        if (htmlelement.classList.contains(\"selected\")) {\n          htmlelement.classList.remove(\"selected\");\n          this._displayFilter.removeCompany(htmlelement.alt);\n        } else {\n          htmlelement.classList.add(\"selected\");\n          this._displayFilter.addCompany(htmlelement.alt);\n        }\n        this._displayFilter.gatherFilteredNodes(this._modelData);\n        this._displayFilter.setRenderingSelection();\n      };\n    }\n    document.getElementById(\"file-input\").onchange = e => {\n      // Once a file has been selected by the user, use the file information to\n      // gather the associated relevant data like thumbnails\n      let fileChoice = e.target.value;\n      let filename = fileChoice.replace(/^.*[\\\\\\/]/, \"\");\n      let modelThumbnail = document.createElement(\"a\");\n      let modelname = filename.split(\".\", 1)[0];\n      modelThumbnail.id = modelname;\n      modelThumbnail.href = \"\";\n      modelThumbnail.className = \"model-thumb\";\n      modelThumbnail.setAttribute(\"model\", modelname);\n      let imgPath = directoryPath + \"/data/thumbnails/\" + modelname + \".png\";\n      // Check to see if the selected model has a corresponding thumbnail made\n      fetch(imgPath).then(resp => {\n        if (resp.ok) {\n          let modelImg = document.createElement(\"img\");\n          modelImg.src = imgPath;\n          modelThumbnail.appendChild(modelImg);\n        } else {\n          modelThumbnail.innerHTML = modelname;\n          console.log(\"No Image for this Model was found.\");\n        }\n      });\n      document.getElementById(\"models-scroller\").appendChild(modelThumbnail);\n      // Now update the event callbacks for the thumbnails\n      this.updateModelList();\n    };\n  } // End setting event handlers\n} // End app class\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ })

/******/ });