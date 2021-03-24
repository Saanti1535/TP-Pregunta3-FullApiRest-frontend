import { HttpErrorResponse } from "@angular/common/http"

export const REST_SERVER_URL = "http://localhost:8080"

export function mostrarError(err: HttpErrorResponse) {
    window.alert(err.status + ' ' + err.message)
  }

