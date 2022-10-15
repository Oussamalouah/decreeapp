import {useState, useEffect} from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

export type EditableFieldData = {
  id: string;
  text: string;
  label: string; // can be inferred
  ariaLabel: string;
};

export type UseSvgFieldsReturn = {
  data: EditableFieldData[];
  status: {
    loading: boolean;
  };
};

/**
 * Returns a list editable elements from an svg
 *
 * @param src - the original source of the svg
 * @example
 * const {data, status: { loading }} = useSvgFields('https://svg.com');
 * @returns {UseSvgFieldsReturn}
 */

export const useSvgFields = (src: string): UseSvgFieldsReturn => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<EditableFieldData[]>([]);
  useEffect(() => {
    const loadSvg = async () => {
      const fields: EditableFieldData[] = [];

      const raw = await d3.xml(src);
      d3.select(raw)
        .selectAll('tspan')
        .each(function () {
          const field = d3.select(this);
          const id: string = field.attr('id');
          const ariaLabel: string = field.attr('aria-label');
          const text = field.text()?.trim();
          const editable = field.attr('contenteditable');
          // (check if editable is null or editable is true) and (id is present)
          if (id && (!editable || editable !== 'false')) {
            fields.push({
              id: id,
              text: text,
              label: _.startCase(id),
              ariaLabel,
            });
          }
        });

      setData(fields);
      setLoading(false);
    };

    loadSvg();
  }, [src]);

  return {data, status: {loading}};
};
