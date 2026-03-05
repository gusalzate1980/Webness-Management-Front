import { Component } from '@angular/core';
import { FieldsetModule } from 'primeng/fieldset';
import { SelectModule } from "primeng/select";
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from "primeng/datepicker";
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from "primeng/button";
import { TagModule } from 'primeng/tag';
import { AccordionModule } from 'primeng/accordion';
import { BadgeModule } from "primeng/badge";

@Component({
  selector: 'app-work-experience',
  imports: [FieldsetModule, SelectModule, InputTextModule, DatePickerModule, TextareaModule, ButtonModule, TagModule, AccordionModule, BadgeModule],
  templateUrl: './work-experience.html',
  styleUrl: './work-experience.css',
})
export class WorkExperience {

}
