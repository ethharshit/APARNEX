export const products = [
 {name:'Moly-IV', composition:'Paracetamol Infusion IP', strength:'1% w/v · 1000 mg/100 ml', pack:'100 ml', image:'moly-iv', width:782, height:820, extra:true},
 {name:'Lemfer-FCM', composition:'Ferric Carboxymaltose Injection', strength:'500 mg/10 ml', pack:'10 ml · Single dose vial', image:'lemfer-fcm', width:1080, height:1440},
 {name:'PERONUM-SB', composition:'Meropenem & Sulbactam for Injection', strength:'1.5 gm', pack:'Powder for injection', image:'peronum-sb', width:1080, height:1440},
 {name:'Moxilem', composition:'Moxifloxacin Infusion', strength:'0.4% w/v · 400 mg/100 ml', pack:'100 ml · Single dose container', image:'infusions', width:1440, height:1080, group:true},
 {name:'RANIFLOX-IV', composition:'Ofloxacin Infusion IP', strength:'0.2% w/v · 200 mg/100 ml', pack:'100 ml · Single dose container', image:'infusions', width:1440, height:1080, group:true},
 {name:'Flunole-IV', composition:'Fluconazole in Sodium Chloride Injection USP', strength:'200 mg/100 ml', pack:'100 ml · Single dose container', image:'infusions', width:1440, height:1080, group:true},
 {name:'LEMNOXA-40', composition:'Enoxaparin Sodium Injection IP', strength:'40 mg/0.4 ml', pack:'Pre-filled syringe', image:'lemnoxa-40', width:1440, height:480}
];
export const productNames=products.map(product=>product.name);
