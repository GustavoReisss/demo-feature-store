import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TabsComponent } from '../../shared/components/tabs/tabs.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [RouterOutlet, TabsComponent, FormsModule],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)

  ngOnInit() {
    let activeRoute = this.activatedRoute.firstChild;
    this.selectedTab = (activeRoute!.routeConfig?.path || 'feature');
  }

  selectedTab = "Feature"
  tabs = [
    { "label": "Feature", "value": "feature" },
    { "label": "Tabela", "value": "tabela" }
  ]

  checkoutTab(tab: string) {
    this.selectedTab = tab
    this.router.navigate([`consulta/${this.selectedTab}`])
  }

}
