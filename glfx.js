/*
 * glfx.js
 * http://evanw.github.com/glfx.js/
 *
 * Copyright 2011 Evan Wallace
 * Released under the MIT license
 */
var fx=function(){function v(b){a=this.gl;return{_:o.fromImage(b)}}function w(b,c){this.width=b;this.height=c;this._.texture=new o(b,c,a.RGBA,a.UNSIGNED_BYTE);this._.spareTexture=new o(b,c,a.RGBA,a.UNSIGNED_BYTE);this._.flippedShader=new m(null,"uniform sampler2D texture;uniform vec2 texSize;varying vec2 texCoord;void main(){gl_FragColor=texture2D(texture,vec2(texCoord.x,1.0-texCoord.y));}");this._.isInitialized=true}function x(b){a=this.gl;
this._.isInitialized||w.call(this,b._.width,b._.height);this._.texture.drawTo(function(){b._.use();m.getDefaultShader().drawRect()});return this}function y(){a=this.gl;this._.texture.use();this._.flippedShader.uniforms({texSize:[this._.texture.width,this._.texture.height]}).drawRect();return this}function n(b,c){var i=this._.texture;this._.spareTexture.drawTo(function(){i.use();b.uniforms(c).drawRect()});this._.spareTexture.swapWith(i)}function z(b){b.parentNode.insertBefore(this,b);b.parentNode.removeChild(b);
return this}function q(b,c,i,k,j,d,e,f){var g=i-j,h=k-d,l=e-j,r=f-d;j=b-i+j-e;d=c-k+d-f;var s=g*r-l*h;l=(j*r-l*d)/s;g=(g*d-j*h)/s;return[i-b+l*i,k-c+l*k,l,e-b+g*e,f-c+g*f,g,b,c,1]}function t(b){var c=b[0],i=b[1],k=b[2],j=b[3],d=b[4],e=b[5],f=b[6],g=b[7];b=b[8];var h=c*d*b-c*e*g-i*j*b+i*e*f+k*j*g-k*d*f;return[(d*b-e*g)/h,(k*g-i*b)/h,(i*e-k*d)/h,(e*f-j*b)/h,(c*b-k*f)/h,(k*j-c*e)/h,(j*g-d*f)/h,(i*f-c*g)/h,(c*d-i*j)/h]}function A(b,c){return[b[0]*c[0]+b[1]*c[3]+b[2]*c[6],b[0]*c[1]+b[1]*c[4]+b[2]*c[7],
b[0]*c[2]+b[1]*c[5]+b[2]*c[8],b[3]*c[0]+b[4]*c[3]+b[5]*c[6],b[3]*c[1]+b[4]*c[4]+b[5]*c[7],b[3]*c[2]+b[4]*c[5]+b[5]*c[8],b[6]*c[0]+b[7]*c[3]+b[8]*c[6],b[6]*c[1]+b[7]*c[4]+b[8]*c[7],b[6]*c[2]+b[7]*c[5]+b[8]*c[8]]}function B(b,c){a.brightnessContrast=a.brightnessContrast||new m(null,"uniform sampler2D texture;uniform float brightness;uniform float contrast;varying vec2 texCoord;void main(){vec3 color=texture2D(texture,texCoord).rgb;color+=brightness;if(contrast>0.0){color=(color-0.5)/(1.0-contrast)+0.5;}else{color=(color-0.5)*(1.0+contrast)+0.5;}gl_FragColor=vec4(color,1.0);}");
n.call(this,a.brightnessContrast,{brightness:Math.max(-1,Math.min(b,1)),contrast:Math.max(-1,Math.min(c,1))});return this}function C(b,c){a.hueSaturation=a.hueSaturation||new m(null,"uniform sampler2D texture;uniform float hue;uniform float saturation;varying vec2 texCoord;void main(){vec3 color=texture2D(texture,texCoord).rgb;float angle=hue*3.14159265;float s=sin(angle),c=cos(angle);vec3 weights=(vec3(2.0*c,-sqrt(3.0)*s-c,sqrt(3.0)*s-c)+1.0)/3.0;float len=length(color);color=vec3(dot(color,weights.xyz),dot(color,weights.zxy),dot(color,weights.yzx));float average=(color.x+color.y+color.z)/3.0;if(saturation>0.0){color+=(average-color)*(1.0-1.0/(1.0-saturation));}else{color+=(average-color)*(-saturation);}gl_FragColor=vec4(color,1.0);}");
n.call(this,a.hueSaturation,{hue:Math.max(-1,Math.min(b,1)),saturation:Math.max(-1,Math.min(c,1))});return this}function D(b,c,i,k){a.dotScreen=a.dotScreen||new m(null,"uniform sampler2D texture;uniform vec2 center;uniform float angle;uniform float scale;uniform vec2 texSize;varying vec2 texCoord;void main(){vec3 color=texture2D(texture,texCoord).rgb;float s=sin(angle),c=cos(angle);vec2 tex=texCoord*texSize-center;vec2 point=vec2(c*tex.x-s*tex.y,s*tex.x+c*tex.y)*scale;float weight=(sin(point.x)*sin(point.y))*2.0;float average=(color.r+color.g+color.b)/3.0;color=vec3(average+(average-0.6)*4.0+weight);gl_FragColor=vec4(color,1.0);}");
n.call(this,a.dotScreen,{center:[b,c],angle:i,scale:Math.PI/k,texSize:[this.width,this.height]});return this}function E(b){a.ink=a.ink||new m(null,"uniform sampler2D texture;uniform float strength;uniform vec2 texSize;varying vec2 texCoord;void main(){vec2 dx=vec2(1.0/texSize.x,0.0);vec2 dy=vec2(0.0,1.0/texSize.y);vec3 color=texture2D(texture,texCoord).rgb;float bigTotal=0.0;float smallTotal=0.0;vec3 bigAverage=vec3(0.0);vec3 smallAverage=vec3(0.0);for(float x=-2.0;x<=2.0;x+=1.0){for(float y=-2.0;y<=2.0;y+=1.0){vec3 sample=texture2D(texture,texCoord+dx*x+dy*y).rgb;bigAverage+=sample;bigTotal+=1.0;if(abs(x)+abs(y)<2.0){smallAverage+=sample;smallTotal+=1.0;}}}vec3 edge=max(vec3(0.0),bigAverage/bigTotal-smallAverage/smallTotal);gl_FragColor=vec4(color-dot(edge,edge)*strength*100000.0,1.0);}");
n.call(this,a.ink,{strength:b*b*b*b*b,texSize:[this.width,this.height]});return this}function F(b,c,i){a.zoomBlur=a.zoomBlur||new m(null,"uniform sampler2D texture;uniform vec2 center;uniform float strength;uniform vec2 texSize;varying vec2 texCoord;float random(vec3 scale,float seed){return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);}void main(){vec3 color=vec3(0.0);float total=0.0;vec2 toCenter=center-texCoord*texSize;float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=0.0;t<=40.0;t++){float percent=(t+offset)/40.0;float weight=4.0*(percent-percent*percent);color+=texture2D(texture,texCoord+toCenter*percent*strength/texSize).rgb*weight;total+=weight;}gl_FragColor=vec4(color/total,1.0);}");
n.call(this,a.zoomBlur,{center:[b,c],strength:i,texSize:[this.width,this.height]});return this}function G(b,c,i,k){a.bulgePinch=a.bulgePinch||p("uniform float radius;uniform float strength;uniform vec2 center;","coord-=center;float distance=length(coord);if(distance<radius){float percent=distance/radius;if(strength>0.0){coord*=mix(1.0,smoothstep(0.0,radius/distance,percent),strength*0.75);}else{coord*=mix(1.0,pow(percent,1.0+strength*0.75)*radius/distance,1.0-percent);}}coord+=center;");
n.call(this,a.bulgePinch,{radius:i,strength:Math.max(-1,Math.min(k,1)),center:[b,c],texSize:[this.width,this.height]});return this}function p(b,c){return new m(null,b+"uniform sampler2D texture;uniform vec2 texSize;varying vec2 texCoord;void main(){vec2 coord=texCoord*texSize;"+c+"gl_FragColor=texture2D(texture,coord/texSize);vec2 clampedCoord=clamp(coord,vec2(0.0),texSize);if(coord!=clampedCoord){gl_FragColor*=max(0.0,1.0-length(coord-clampedCoord));}}")}
function H(b,c){a.matrixWarp=a.matrixWarp||p("uniform mat3 matrix;","vec3 warp=matrix*vec3(coord,1.0);coord=warp.xy/warp.z;");b=Array.prototype.concat.apply([],b);if(b.length==4)b=[b[0],b[1],0,b[2],b[3],0,0,0,1];else if(b.length!=9)throw"can only warp with 2x2 or 3x3 matrix";n.call(this,a.matrixWarp,{matrix:c?t(b):b,texSize:[this.width,this.height]});return this}function I(b,c){var i=q.apply(null,c),k=q.apply(null,b);return this.matrixWarp(A(t(i),k))}function J(b,
c,i,k){a.swirl=a.swirl||p("uniform float radius;uniform float angle;uniform vec2 center;","coord-=center;float distance=length(coord);if(distance<radius){float percent=(radius-distance)/radius;float theta=percent*percent*angle;float s=sin(theta);float c=cos(theta);coord=vec2(coord.x*c-coord.y*s,coord.x*s+coord.y*c);}coord+=center;");
n.call(this,a.swirl,{radius:i,center:[b,c],angle:k,texSize:[this.width,this.height]});return this}var u={},a;u.canvas=function(){var b=document.createElement("canvas");try{b.gl=b.getContext("experimental-webgl")}catch(c){b.gl=null}if(!b.gl)throw"This browser does not support WebGL";b._={isInitialized:false,texture:null,spareTexture:null};b.texture=v;b.draw=x;b.update=y;b.replace=z;b.brightnessContrast=B;b.hueSaturation=C;b.perspective=I;b.matrixWarp=H;b.bulgePinch=G;b.dotScreen=D;b.zoomBlur=F;b.swirl=
J;b.ink=E;return b};var m=function(){function b(e,f){var g=a.createShader(e);a.shaderSource(g,f);a.compileShader(g);if(!a.getShaderParameter(g,a.COMPILE_STATUS))throw"compile error: "+a.getShaderInfoLog(g);return g}function c(e,f){this.texCoordAttribute=this.vertexAttribute=null;this.program=a.createProgram();this.isZombie=false;e=e||i;f=f||k;f="precision highp float;"+f;a.attachShader(this.program,b(a.VERTEX_SHADER,e));a.attachShader(this.program,b(a.FRAGMENT_SHADER,f));a.linkProgram(this.program);
if(!a.getProgramParameter(this.program,a.LINK_STATUS))throw"link error: "+a.getProgramInfoLog(this.program);}var i="attribute vec2 vertex;attribute vec2 _texCoord;varying vec2 texCoord;void main(){texCoord=_texCoord;gl_Position=vec4(vertex*2.0-1.0,0.0,1.0);}",k="uniform sampler2D texture;varying vec2 texCoord;void main(){gl_FragColor=texture2D(texture,texCoord);}";c.prototype._delete=function(){a.deleteProgram(this.program);
this.program=null;this.isZombie=true};c.prototype.uniforms=function(e){if(this.isZombie)throw"attempted to use a shader after deleting it";a.useProgram(this.program);for(var f in e)if(e.hasOwnProperty(f)){var g=a.getUniformLocation(this.program,f);if(g!==null){var h=e[f];if(Object.prototype.toString.call(h)=="[object Array]")switch(h.length){case 1:a.uniform1fv(g,new Float32Array(h));break;case 2:a.uniform2fv(g,new Float32Array(h));break;case 3:a.uniform3fv(g,new Float32Array(h));break;case 4:a.uniform4fv(g,
new Float32Array(h));break;case 9:a.uniformMatrix3fv(g,false,new Float32Array(h));break;case 16:a.uniformMatrix4fv(g,false,new Float32Array(h));break;default:throw"dont't know how to load uniform \""+f+'" of length '+h.length;}else if(Object.prototype.toString.call(h)=="[object Number]")a.uniform1f(g,h);else throw'attempted to set uniform "'+f+'" to invalid value '+(h||"undefined").toString();}}return this};c.prototype.textures=function(e){if(this.isZombie)throw"attempted to use a shader after deleting it";
a.useProgram(this.program);for(var f in e)e.hasOwnProperty(f)&&a.uniform1i(a.getUniformLocation(this.program,f),e[f]);return this};var j=null,d=null;c.prototype.drawRect=function(e,f,g,h){if(this.isZombie)throw"attempted to use a shader after deleting it";var l=a.getParameter(a.VIEWPORT);f=f!==void 0?(f-l[1])/l[3]:0;e=e!==void 0?(e-l[0])/l[2]:0;g=g!==void 0?(g-l[0])/l[2]:1;h=h!==void 0?(h-l[1])/l[3]:1;if(j==null)j=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,j);a.bufferData(a.ARRAY_BUFFER,new Float32Array([e,
f,e,h,g,f,g,h]),a.STATIC_DRAW);if(d==null){d=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,d);a.bufferData(a.ARRAY_BUFFER,new Float32Array([0,0,0,1,1,0,1,1]),a.STATIC_DRAW)}if(this.vertexAttribute==null){this.vertexAttribute=a.getAttribLocation(this.program,"vertex");a.enableVertexAttribArray(this.vertexAttribute)}if(this.texCoordAttribute==null){this.texCoordAttribute=a.getAttribLocation(this.program,"_texCoord");a.enableVertexAttribArray(this.texCoordAttribute)}a.useProgram(this.program);a.bindBuffer(a.ARRAY_BUFFER,
j);a.vertexAttribPointer(this.vertexAttribute,2,a.FLOAT,false,0,0);a.bindBuffer(a.ARRAY_BUFFER,d);a.vertexAttribPointer(this.texCoordAttribute,2,a.FLOAT,false,0,0);a.drawArrays(a.TRIANGLE_STRIP,0,4)};c.getDefaultShader=function(){a.defaultShader=a.defaultShader||new c;return a.defaultShader};return c}(),o=function(){function b(d){a.bindTexture(a.TEXTURE_2D,d.id);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR);a.texParameteri(a.TEXTURE_2D,
a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE)}function c(d,e,f,g){this.id=a.createTexture();this.width=d;this.height=e;this.format=f;this.type=g;if(d&&e){b(this);a.texImage2D(a.TEXTURE_2D,0,this.format,d,e,0,this.format,this.type,null)}}function i(d){if(j==null)j=document.createElement("canvas");j.width=d.width;j.height=d.height;d=j.getContext("2d");d.clearRect(0,0,j.width,j.height);return d}c.fromImage=function(d){var e=new c(d.width,d.height,a.RGBA,
a.UNSIGNED_BYTE);b(e);a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,d);return e};c.prototype._delete=function(){a.deleteTexture(this.id);this.id=null};c.prototype.use=function(d){a.activeTexture(a.TEXTURE0+(d||0));a.bindTexture(a.TEXTURE_2D,this.id)};var k=null;c.prototype.drawTo=function(d){k=k||a.createFramebuffer();a.bindFramebuffer(a.FRAMEBUFFER,k);a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,this.id,0);a.viewport(0,0,this.width,this.height);d();a.bindFramebuffer(a.FRAMEBUFFER,
null)};var j=null;c.prototype.fillUsingCanvas=function(d){d(i(this));this.format=a.RGBA;this.type=a.UNSIGNED_BYTE;a.bindTexture(a.TEXTURE_2D,this.id);a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,j);return this};c.prototype.toImage=function(d){this.use();m.getDefaultShader().drawRect();var e=this.width*this.height*4,f=new Uint8Array(e),g=i(this),h=g.createImageData(this.width,this.height);a.readPixels(0,0,this.width,this.height,a.RGBA,a.UNSIGNED_BYTE,f);for(var l=0;l<e;l++)h.data[l]=f[l];
g.putImageData(h,0,0);d.src=j.toDataURL()};c.prototype.swapWith=function(d){var e;e=d.id;d.id=this.id;this.id=e;e=d.width;d.width=this.width;this.width=e;e=d.height;d.height=this.height;this.height=e;e=d.format;d.format=this.format;this.format=e};return c}();return u}();