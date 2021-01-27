export type LatLngType = {
  lat: number
  lng: number
}

export type geocodeByAddressType = {
  address_components: []
  formated_address: string
  geometry: any
  place_id: string
  plus_code: {
    compound_code: string
    global_code: string
  }
  types: Array<string>
}
