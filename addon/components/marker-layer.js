import { observer } from '@ember/object';
import BaseLayer from 'ember-leaflet/components/base-layer';
import DraggabilityMixin from 'ember-leaflet/mixins/draggability';
import DivOverlayableMixin from 'ember-leaflet/mixins/div-overlayable';
import toLatLng from 'ember-leaflet/macros/to-lat-lng';

export default BaseLayer.extend(DraggabilityMixin, DivOverlayableMixin, {

  leafletRequiredOptions: Object.freeze([
    'location'
  ]),

  leafletOptions: Object.freeze([
    'icon', 'clickable', 'draggable', 'keyboard', 'title',
    'alt', 'zIndexOffset', 'opacity', 'riseOnHover', 'riseOffset'
  ]),

  leafletEvents: Object.freeze([
    'click', 'dblclick', 'mousedown', 'mouseover', 'mouseout',
    'contextmenu', 'dragstart', 'drag', 'dragend', 'move', 'moveend',
    'remove', 'add', 'popupopen', 'popupclose'
  ]),

  leafletProperties: Object.freeze([
    'zIndexOffset', 'opacity', 'location:setLatLng'
  ]),

  location: toLatLng(),

  createLayer() {
    return this.L.marker(...this.get('requiredOptions'), this.get('options'));
  },

  // icon observer separated from generated (leaflet properties) due to a
  // leaflet bug where draggability is lost on icon change
  iconDidChange: observer('icon', function() {
    this._layer.setIcon(this.get('icon'));
    if (!this._layer.dragging) { return; }

    if (this.get('draggable')) {
      this._layer.dragging.enable();
    } else {
      this._layer.dragging.disable();
    }
  })
});
