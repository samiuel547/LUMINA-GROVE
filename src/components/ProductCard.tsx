import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../constants';

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative bg-titanium-800 rounded-3xl overflow-hidden border border-white/5 flex flex-col"
    >
      <div className="aspect-square overflow-hidden bg-black">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-titanium-500 font-bold mb-2">
            {product.category}
          </p>
          <h3 className="text-2xl font-bold tracking-tight">{product.name}</h3>
        </div>
        
        <div className="mt-auto flex items-center justify-between">
          <p className="text-lg font-medium text-titanium-300">{product.price}</p>
          <button className="text-blue-500 font-semibold text-sm hover:underline">
            Buy
          </button>
        </div>
      </div>
    </motion.div>
  );
};
