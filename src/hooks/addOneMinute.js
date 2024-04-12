import {contract} from "@/services/services"
export function addOneMinute(address) {
    contract.methods.addOneMinute().send({'from': address})
}