import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScheduleServiceContext, ScheduledServicesComsumer } from './schedule_service_context'
import { InputText } from "../../components/Inputs";
import { LocaleRepository } from "../../repositories/locale_repository";
import { Locale } from "../../models/locale";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppParamsList } from "../../routes/ParamList";
import { PrimaryButton } from "../../components/Buttons";
import { UserRepository } from "../../repositories/user_repository";
import { BackgroundColor, WhiteColor } from "../../constants/colors";
import { toString } from './../../../node_modules/moment/src/lib/moment/format';

export function ScheduleServiceCepPage({ route, navigation
}: NativeStackScreenProps<AppParamsList, 'ScheduleServiceCepPage'>) {
  const { state, dispatch } = React.useContext(ScheduleServiceContext);

  const [cep, setCep] = useState<string | undefined>("");
  const [address, setAddress] = useState<Locale>();
  const [numero, setNumero] = useState<string | undefined>("")
  const [rua, setRua] = useState<string | undefined>("")
  const [bairro, setBairro] = useState<string | undefined>("")
  const [uf, setUf] = useState<string | undefined>("")
  const [cidade, setCidade] = useState<string | undefined>("")
  const { id } = route.params;

  const addressRep = new LocaleRepository();
  const userRep = new UserRepository();

  function getProfessionalAddressId() {
    let aId: string | undefined
    userRep.get(id, user => {
      aId = user?.endereco_fk
    })
    return aId;
  }
  console.log(JSON.stringify(state))

  function getAddress() {

    let eAddress: Locale | undefined;
    let addressId = getProfessionalAddressId();
    addressRep.getAll(allAddress => {
      eAddress = allAddress?.find(address => {
        address.id === addressId
      })
    })
    if (eAddress !== undefined) {
      setAddress(eAddress)
    }
  }

  function fillAddressForm(add: Locale) {

    if (add !== undefined) {
      setCep(add.cep);
      setBairro(add.bairro);
      setRua(add.rua);
      setUf(add.uf);
      setCidade(add.cidade);
    }
  }

  useEffect(() => {
    getAddress()
    if (address !== undefined) {
      fillAddressForm(address)
    }
  }, [address])

  function createLocale() {
    let address = new Locale();
    address.bairro = bairro;
    address.cep = cep;
    address.cidade = cidade;
    address.rua = rua;
    address.uf = uf;
    return address;
  }

  return (
    <View style={styles.body}>
      <Text style={styles.title}> Endereço do Serviço </Text>
      <InputText
        placeholder="CEP"
        label="Digite o CEP: "
        value={cep}
        onChange={value => setCep(value)}
      />

      <InputText
        placeholder="Favor digitar o Número"
        label="Digite o número: "
        value={numero}
        onChange={value => setNumero(value)}
      />
      <InputText
        placeholder="Rua"
        label="Nome da Rua: "
        value={rua}
        onChange={value => setRua(value)}
      />
      <InputText
        placeholder="Bairro"
        label="Nome do Bairro: "
        value={bairro}
        onChange={value => setBairro(value)}
      />
      <ScheduledServicesComsumer>
        {state => <InputText
          placeholder="Cidade"
          label="Nome da Cidade: "
          value={JSON.stringify(state)}
          onChange={value => setCidade(value)}
        />}
      </ScheduledServicesComsumer>


      <InputText
        placeholder="UF"
        label="Entre com o UF: "
        value={uf}
        onChange={value => setUf(value)}
      />

      <PrimaryButton
        title="Próximo"
        onPress={() => {
          navigation.navigate("ScheduleServiceCepPage", { id })
          dispatch?.({ type: "set_address_page", payload: createLocale() })
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: BackgroundColor,
  },
  title: {
    paddingTop: 6,
    paddingBottom: 20,
    color: WhiteColor,
    fontSize: 28,
    fontFamily: 'Manrope-SemiBold',
  }
})
