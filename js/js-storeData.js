// ==UserScript==
// @name         js-storeData
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  轻量级原生js本地数据存储管理工具(可选localstorage或GM油猴API)
// @author       tutu辣么可爱(greasyfork)/IcedWatermelonJuice(github)
// @dayr         2022.5.27 GMT+0800 (中国标准时间)
// @license      MIT License
// @note         相关参考信息请前往greasyfork仓库或github仓库
// @note         greasyfork仓库:https://greasyfork.org/zh-CN/scripts/444155-js-storedata
// @note         github仓库:https://github.com/IcedWatermelonJuice/js-storeData
// ==/UserScript==
var storeDataJS = function(dataKey, defaultData, isGM = false) {
	var defaultGM = function() {
		console.log("未获得GM油猴API，请确认是否已授权");
		return null;
	}
	this.check = function(data) {
		try {
			data = JSON.stringify(data);
			data = JSON.parse(data);
			if (data && typeof data === "object") {
				return true
			} else {
				return false
			}
		} catch (e) {
			return false
		}
	}
	this.copy = function(data) {
		return data?JSON.parse(JSON.stringify(data)):{};
	}
	this.merge = function(data) {
		data = typeof data === "string" ? JSON.parse(data) : this.copy(data);
		data = this.check(data) ? data : {};
		this.data = {
			...this.data,
			...data
		}
		return this.data
	}
	this.defaultGet = function(key) {
		return isGM ? (typeof GM_getValue === "function" ? GM_getValue(key) : defaultGM(key)) : localStorage
			.getItem(key)
	}
	this.defaultSet = function(key, val) {
		return isGM ? (typeof GM_setValue === "function" ? GM_setValue(key, val) : defaultGM(key, val)) :
			localStorage.setItem(key, val)
	}
	this.defaultRemove = function(key) {
		return isGM ? (typeof GM_deleteValue === "function" ? GM_deleteValue(key) : defaultGM(key)) :
			localStorage.removeItem(key)
	}
	this.init = function() {
		this.data = this.copy(this.defaultData);
		this.data = this.merge(this.defaultGet(this.dataKey));
	}
	this.dataKey = dataKey;
	this.defaultData = this.check(defaultData) ? defaultData : {};
	this.isGM = isGM;
	this.data = {};
	this.init();
}
storeDataJS.prototype = {
	save: function() {
		if (this.check(this.data)) {
			this.defaultSet(this.dataKey, JSON.stringify(this.data))
		} else {
			console.log("保存失败！待保存数据损坏")
		}
	},
	remove: function() {
		this.defaultRemove(this.dataKey);
	},
	get: function(key, isDefault = false) {
		let data = this.copy(isDefault ? this.defaultData : this.data);
		return key&&data.hasOwnProperty(key) ? data[key] : data;
	},
	set: function(key, val, isSave = false) {
		if (val !== undefined && val !== null) {
			this.data[key] = val;
		} else if (this.check(key)) {
			this.data = key;
		}
		if (isSave) {
			this.save();
		}
	},
	reset: function(isSave = false) {
		let data = this.get(null, true);
		this.set(data, null, isSave);
	},
	delete: function(key, isSave = false) {
		delete this.data[key];
		if (isSave) {
			this.save();
		}
	},
	length: function(isDefault = false) {
		return Object.keys(isDefault ? this.defaultData : this.data).length
	},
	encrypt: function(data) {
		return data
	},
	decrypt: function(data) {
		return data
	},
	export: function(isEncrypted = false, encryptFn = this.encrypt) {
		let data = JSON.stringify(this.data);
		return isEncrypted ? encryptFn(data) : data;
	},
	inport: function(data, isEncrypted = false, decryptFn = this.decrypt) {
		data = typeof data === "string" ? JSON.parse(isEncrypted ? decryptFn(data) : data) : data;
		if (this.check(data)) {
			this.merge(data);
			this.save();
		} else {
			console.log(`${this.dataKey} 导入失败！\n可能的原因:\n(1)导入数据损坏\n(2)导入数据已被加密\n(3)解密算法与加密算法不匹配`);
		}
	}
}
