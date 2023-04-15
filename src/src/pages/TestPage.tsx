import { View } from "react-native";
import { PrimaryButton } from "../components/Buttons";
import { AddressRepository } from "../repositories/address_repository";
import { Address } from "../models/address";

export function TestPage() {

    const registerAddress = () => {
        const addressRepo = new AddressRepository();
        addressRepo.get("-NT3t5zTDA2As_dN7G3R", (addr) => {
            addr!.logradouro = 'Das Glicineas';
            addressRepo.delete(addr!, () => { });
        });
    };

    return <View><PrimaryButton title="Cadastrar endereço" onPress={registerAddress} /></View>;
}