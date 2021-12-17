import Config from '../configuration/Config'
import AxiosServices from './AxiosServices'

const axiosService = new AxiosServices()

export default class CrudServices {
  CreateInformation(data) {
    console.log('CreateInformation : ' + Config.CreateInformation)
    return axiosService.post(Config.CreateInformation, data, false)
  }

  ReadInformation() {
    console.log('ReadInformation : ' + Config.ReadInformation)
    return axiosService.get(Config.ReadInformation, false)
  }

  UpdateInformation(data) {
    console.log('UpdateInformation : ' + Config.UpdateInformation)
    return axiosService.put(Config.UpdateInformation, data, false)
  }

  DeleteInformation(data) {
    console.log('DeleteInformation : ' + Config.DeleteInformation)
    console.table(data)
    return axiosService.post(Config.DeleteInformation, data, false)
  }
}
