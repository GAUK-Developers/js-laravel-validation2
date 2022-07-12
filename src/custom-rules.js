import { messages, setMessageHandler } from "./messages";
import RULES from "./rules";

const customRules = {};

export function addCustomRule(name, rule, messageHandler) {
    if(RULES[name]){
        throw new Error("Custom rule cannot have same name as an existing rule.");
    }
    customRules[name] = rule;
    setMessageHandler(name, messageHandler);
}

export function clearCustomRules(){
    const keys = Object.keys(customRules);
    for(let x in keys){
        delete messages[keys[x]];
    }
    customRules = {};
}

export default customRules;