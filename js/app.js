(function(){'use strict';function $(s,r){return(r||document).querySelector(s);}function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
var store={get:function(k,f){try{var v=localStorage.getItem(k);return v?JSON.parse(v):f;}catch(e){return f;}},set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}},del:function(k){try{localStorage.removeItem(k);}catch(e){} }};
var ADMIN_EMAILS=['admin@gmail.com','leducthangvt2009@gmail.com'];
var DEFAULT_ADMIN_PASS='admin123';
var USERS_KEY='ontap:users';var SESSION_KEY='ontap:session';var LEGACY_SESSION_KEY='ontap:current_user';
function bytesToHex(b){var h='';for(var i=0;i<b.length;i++)h+=b[i].toString(16).padStart(2,'0');return h;}
function randomHex(len){try{var arr=new Uint8Array(len);if(window.crypto&&window.crypto.getRandomValues){window.crypto.getRandomValues(arr);return bytesToHex(arr);}}catch(e){}var s='';for(var i=0;i<len;i++)s+=Math.floor(Math.random()*256).toString(16).padStart(2,'0');return s;}
async function sha256Hex(str){try{if(window.crypto&&window.crypto.subtle){var enc=new TextEncoder();var buf=await window.crypto.subtle.digest('SHA-256',enc.encode(str));return bytesToHex(new Uint8Array(buf));}}catch(e){}var h=0,i,c;for(i=0;i<str.length;i++){c=str.charCodeAt(i);h=((h<<5)-h)+c;h|=0;}return 'fb_'+Math.abs(h).toString(16);}
function legacyEncodePass(p){try{return btoa(unescape(encodeURIComponent('mono_salt_'+p)));}catch(e){return p;}}
async function hashPassword(p,salt){salt=salt||randomHex(16);var h=await sha256Hex(salt+'|'+p);return {hash:h,salt:salt,algo:'sha256-v1'};}
async function verifyPassword(p,user){if(!user)return{ok:false,upgraded:false};if(user.hashAlgo==='sha256-v1'&&user.salt&&user.passHash){var r=await hashPassword(p,user.salt);if(r.hash===user.passHash)return{ok:true,upgraded:false};return{ok:false,upgraded:false};}if(user.passHash&&user.passHash===legacyEncodePass(p))return{ok:true,upgraded:true};return{ok:false,upgraded:false};}
function isAdminEmail(e){return ADMIN_EMAILS.indexOf(String(e||'').toLowerCase().trim())!==-1;}
function getUsers(){var list=store.get(USERS_KEY,[]);if(!Array.isArray(list))list=[];var hasAdmin=list.some(function(u){return u.email==='admin@gmail.com';});if(!hasAdmin){(async function(){var hp=await hashPassword(DEFAULT_ADMIN_PASS,randomHex(16));list.unshift({email:'admin@gmail.com',nickname:'Admin Tỷ Phú',passHash:hp.hash,salt:hp.salt,hashAlgo:hp.algo,role:'admin',createdAt:Date.now(),mustChangePass:true});store.set(USERS_KEY,list);})();}return list;}
function saveUsers(list){store.set(USERS_KEY,list);}
function createSession(user){var token=randomHex(32);store.set(SESSION_KEY,{token:token,email:user.email,exp:Date.now()+7*24*60*60*1000});store.del(LEGACY_SESSION_KEY);return token;}
function getCurrentSession(){var s=store.get(SESSION_KEY,null);if(!s||!s.token||!s.email){var le=store.get(LEGACY_SESSION_KEY,null);if(le){var users=getUsers();var fu=users.filter(function(u){return u.email===le;})[0];if(fu){createSession(fu);return store.get(SESSION_KEY,null);}store.del(LEGACY_SESSION_KEY);}return null;}if(s.exp&&Date.now()>s.exp){store.del(SESSION_KEY);return null;}return s;}
function getCurrentUser(){var sess=getCurrentSession();if(!sess||!sess.email)return null;var users=getUsers();var found=users.filter(function(u){return u.email===sess.email;})[0];if(!found){store.del(SESSION_KEY);return null;}return found;}
// ... rest of original file continues below
})();