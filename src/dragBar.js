"use strict";

import * as d3 from 'd3';

// http://bl.ocks.org/mccannf/1629464
export class DragBarVertical {
	constructor(parentGElm, size, range, init_pos) {
		this._onDrag = null;
		[this.xMin, this.xMax] = range;
		[this.x, this.y] = init_pos;
		this.dragBehavior = d3.drag()
			.on('drag', this._onDragDelegate.bind(this));
		this.g = parentGElm.append("g")
			.data([this,]);
		this.dragHandle = this.g.append("rect")
		    .classed('dragbar-vertical', true)
			.attr("fill", "lightblue")
			.attr("fill-opacity", .5)
			.attr("cursor", "ew-resize")
			.call(this.dragBehavior);
		this.size(size[0], size[1]);
	}
	range(xMin, xMax) {
		if (arguments.length) {
			[this.xMin, this.xMax] = [xMin, xMax];
		} else {
			return [this.xMin, this.xMax];
		}
	}
	size(width, height) {
		if (arguments.length) {
			this._size = [width, height];
			if (width > 0 && height > 0) {
				this.dragHandle
					.attr("x", function(d) { return d.x - (width / 2); })
					.attr("y", function(d) { return d.y; })
					.attr("height", height)
					.attr("width", width);
			}
		} else {
			return this._size;
		}
	}
	_onDragDelegate(d) {
		var width = this._size[0];
		var dragx = Math.max(
			this.xMin + (width / 2),
			Math.min(this.xMax, d.x + d3.event.dx + (width / 2))
		);
		this.x = dragx - (width / 2);
		this.dragHandle
			.attr("x", function(d) { return d.x });
		if (this._onDrag)
			this._onDrag(this);
	}
	onDrag(fn) {
		if (arguments.length) {
			this._onDrag = fn;
			return this;
		} else {
			return this._onDrag;
		}
	}
}