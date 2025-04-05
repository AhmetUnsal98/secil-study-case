"use client";
import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Product } from "@/app/types/product";
import ProductCard from "./ProductCard";
import { useDispatch } from "react-redux";
import { setFilteredProducts } from "@/app/redux/productsReducer";

const getProductId = (product: Product) =>
  `${product.productCode}-${product.colorCode}`;

export default function DraggableProductGrid({
  products,
}: {
  products: Product[];
}) {
  const dispatch = useDispatch();
  const [items, setItems] = useState(products);

  useEffect(() => {
    setItems(products);
  }, [products]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex(
        (item) => getProductId(item) === active.id
      );
      const newIndex = items.findIndex(
        (item) => getProductId(item) === over.id
      );

      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      dispatch(setFilteredProducts(newItems));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => getProductId(item))}
        strategy={rectSortingStrategy}
      >
        <div className="flex flex-wrap gap-4 overflow-y-auto max-h-[70vh]">
          {items.map((product) => (
            <SortableProductCard
              key={getProductId(product)}
              id={getProductId(product)}
              product={product}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

const SortableProductCard = ({
  id,
  product,
}: {
  id: string;
  product: Product;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-full sm:w-[48%] lg:w-[30%]"
    >
      <div {...attributes} {...listeners} className="cursor-move">
        <ProductCard product={product} />
      </div>
    </div>
  );
};
