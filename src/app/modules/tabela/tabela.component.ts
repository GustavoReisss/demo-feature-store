import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { FeatureBagService } from '../../shared/services/feature-bag/feature-bag.service';
import { HttpService } from '../../shared/services/http.service';
import { Table } from '../../shared/interfaces/table.interface';
import { combineLatest, delay, first, forkJoin, map, of } from 'rxjs';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabelaComponent implements OnInit {
  featureBagService = inject(FeatureBagService)
  httpService = inject(HttpService)

  table = signal<Partial<Table>>({})

  tableSamples = computed(() => Object.values(this.table().table_sample || {}))


  ngOnInit(): void {
    this.fetchTable()
  }

  fetchTable() {
    combineLatest([
      this.featureBagService.selectedFeatures,
      this.httpService.getById<Table>("tables", 1).pipe(delay(1000)),
    ])
      .pipe(
        first(),
        map(([selectedFeature, table]) => {
          let selectedFeatureNames = (selectedFeature[table.table_name] || []).map(selectedFeature => selectedFeature.feature_name)

          table.table_feature_list = table.table_feature_list?.map(feature => {
            feature["added"] = selectedFeatureNames.includes(feature.feature_name)
            return feature
          })

          return table
        })
      )
      .subscribe(res => { console.log(res); this.table.set(res) })
  }

  get anyFeatureSelected(): boolean | undefined {
    return this.table().table_feature_list?.map(feature => feature.added).some(added => added === true)
  }

  get featureTableExtraClasses() {
    return (
      this.table().table_feature_list &&
      Array.isArray(this.table().table_feature_list)
      && this.table().table_feature_list!.length > 3
    ) ? 'h-52 resize-vertical' : ''
  }

  get sampleTableExtraClasses() {
    return (
      this.table().table_sample &&
      typeof (this.table().table_sample) === 'object'
      && Object.keys(this.table().table_sample!).length > 3
    ) ? 'h-80 resize-vertical' : ''
  }

  toggleFeature(feature: any) {
    feature["added"] = !feature["added"]
    this.featureBagService.toggleFeature(feature)
  }

  toggleTable() {
    this.featureBagService.toggleTable(this.table() as Table)
    const newAddedState = !this.anyFeatureSelected

    this.table.update(table => {
      table.table_feature_list?.map(feature => {
        feature.added = newAddedState;
        return feature
      })
      return table
    })
  }

}
