import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  actionTemplate: TemplateRef<any>;

  constructor() { }

}
