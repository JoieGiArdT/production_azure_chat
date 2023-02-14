import axios from 'axios'
class NinoxService {
  async uploadImage (
    data: any
  ): Promise<void> {
    await axios('https://api.ninox.com/v1/teams/HzoowJreFjyRd3JhF/databases/k4h0mrecekgk/tables/A/records/4/files/', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer 4099b180-a72b-11ed-be60-4be7ff369d7f'
      },
      data
    })
  }

  async createField (
    data: any
  ): Promise<void> {
    await axios('https://api.ninox.com/v1/teams/HzoowJreFjyRd3JhF/databases/k4h0mrecekgk/tables/C/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 4099b180-a72b-11ed-be60-4be7ff369d7f'
      },
      data
    })
  }
}
const ninoxService = new NinoxService()
export { ninoxService }
