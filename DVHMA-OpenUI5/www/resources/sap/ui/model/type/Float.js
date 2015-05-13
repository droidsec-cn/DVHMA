/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/format/NumberFormat','sap/ui/model/SimpleType'],function(q,N,S){"use strict";var F=S.extend("sap.ui.model.type.Float",{constructor:function(){S.apply(this,arguments);this.sName="Float";}});F.prototype.formatValue=function(v,i){var V=v;if(v==undefined||v==null){return null;}if(this.oInputFormat){V=this.oInputFormat.parse(v);if(V==null){throw new sap.ui.model.FormatException("Cannot format float: "+v+" has the wrong format");}}switch(this.getPrimitiveType(i)){case"string":return this.oOutputFormat.format(V);case"int":return Math.floor(V);case"float":case"any":return V;default:throw new sap.ui.model.FormatException("Don't know how to format Float to "+i);}};F.prototype.parseValue=function(v,i){var r,b;switch(this.getPrimitiveType(i)){case"string":r=this.oOutputFormat.parse(v);if(isNaN(r)){b=sap.ui.getCore().getLibraryResourceBundle();throw new sap.ui.model.ParseException(b.getText("Float.Invalid"));}break;case"int":case"float":r=v;break;default:throw new sap.ui.model.ParseException("Don't know how to parse Float from "+i);}if(this.oInputFormat){r=this.oInputFormat.format(r);}return r;};F.prototype.validateValue=function(v){if(this.oConstraints){var b=sap.ui.getCore().getLibraryResourceBundle(),V=[],m=[];q.each(this.oConstraints,function(n,c){switch(n){case"minimum":if(v<c){V.push("minimum");m.push(b.getText("Float.Minimum",[c]));}break;case"maximum":if(v>c){V.push("maximum");m.push(b.getText("Float.Maximum",[c]));}}});if(V.length>0){throw new sap.ui.model.ValidateException(m.join(" "),V);}}};F.prototype.setFormatOptions=function(f){this.oFormatOptions=f;this._createFormats();};F.prototype._handleLocalizationChange=function(){this._createFormats();};F.prototype._createFormats=function(){var s=this.oFormatOptions.source;this.oOutputFormat=N.getFloatInstance(this.oFormatOptions);if(s){if(q.isEmptyObject(s)){s={groupingEnabled:false,groupingSeparator:",",decimalSeparator:"."};}this.oInputFormat=N.getFloatInstance(s);}};return F;},true);
