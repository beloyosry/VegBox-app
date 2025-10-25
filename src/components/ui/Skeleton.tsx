import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';
import { colors, borderRadius } from '../../constants';

interface SkeletonProps {
  style?: ViewStyle;
  variant?: 'default' | 'card' | 'text' | 'circle' | 'button';
  width?: string | number;
  height?: string | number;
  count?: number;
}

export function Skeleton({
  style,
  variant = 'default',
  width,
  height,
  count = 1,
}: SkeletonProps) {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  const opacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const variantStyles = {
    default: styles.default,
    card: styles.card,
    text: styles.text,
    circle: styles.circle,
    button: styles.button,
  };

  const customStyle: any = {
    ...(width && { width }),
    ...(height && { height }),
  };

  if (count > 1) {
    return (
      <View>
        {Array.from({ length: count }).map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.skeleton,
              variantStyles[variant],
              customStyle,
              style,
              { opacity },
            ]}
          />
        ))}
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.skeleton,
        variantStyles[variant],
        customStyle,
        style,
        { opacity },
      ]}
    />
  );
}

export function CategoryGridSkeleton() {
  return (
    <View style={styles.grid}>
      {Array.from({ length: 6 }).map((_, index) => (
        <View key={index} style={styles.categorySkeletonItem}>
          <Skeleton variant="circle" width={60} height={60} />
          <Skeleton variant="text" width={50} height={12} style={{ marginTop: 8 }} />
        </View>
      ))}
    </View>
  );
}

export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <View style={styles.productGrid}>
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={styles.productCardSkeleton}>
          <Skeleton variant="card" height={120} style={{ marginBottom: 8 }} />
          <Skeleton variant="text" width="80%" height={14} style={{ marginBottom: 4 }} />
          <Skeleton variant="text" width="60%" height={12} />
        </View>
      ))}
    </View>
  );
}

export function ProductDetailSkeleton() {
  return (
    <View style={styles.productDetailContainer}>
      <Skeleton variant="default" height={300} style={{ marginBottom: 16 }} />
      <View style={{ padding: 16 }}>
        <Skeleton variant="text" width="70%" height={24} style={{ marginBottom: 8 }} />
        <Skeleton variant="text" width="40%" height={16} style={{ marginBottom: 16 }} />
        <Skeleton variant="text" width="50%" height={32} style={{ marginBottom: 16 }} />
        <View style={styles.attributesRow}>
          <Skeleton variant="button" width={100} height={60} />
          <Skeleton variant="button" width={100} height={60} />
          <Skeleton variant="button" width={100} height={60} />
        </View>
        <Skeleton variant="text" width="100%" height={100} style={{ marginTop: 16 }} />
      </View>
    </View>
  );
}

export function CartItemSkeleton() {
  return (
    <View style={styles.cartItemSkeleton}>
      <Skeleton variant="circle" width={24} height={24} />
      <Skeleton variant="card" width={80} height={80} style={{ marginHorizontal: 12 }} />
      <View style={{ flex: 1 }}>
        <Skeleton variant="text" width="80%" height={16} style={{ marginBottom: 8 }} />
        <Skeleton variant="text" width="50%" height={14} style={{ marginBottom: 8 }} />
        <Skeleton variant="text" width="40%" height={18} />
      </View>
    </View>
  );
}

export function CartSkeleton({ count = 3 }: { count?: number }) {
  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
      {Array.from({ length: count }).map((_, index) => (
        <CartItemSkeleton key={index} />
      ))}
    </View>
  );
}

export function OrderSkeleton() {
  return (
    <View style={styles.orderSkeleton}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
        <Skeleton variant="text" width="40%" height={16} />
        <Skeleton variant="button" width={80} height={24} />
      </View>
      <Skeleton variant="text" width="60%" height={14} style={{ marginBottom: 8 }} />
      <Skeleton variant="text" width="50%" height={14} style={{ marginBottom: 12 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Skeleton variant="text" width="30%" height={20} />
        <Skeleton variant="text" width="25%" height={16} />
      </View>
    </View>
  );
}

export function OrdersSkeleton({ count = 5 }: { count?: number }) {
  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
      {Array.from({ length: count }).map((_, index) => (
        <OrderSkeleton key={index} />
      ))}
    </View>
  );
}

export function OrderDetailSkeleton() {
  return (
    <View style={{ padding: 16 }}>
      <Skeleton variant="card" height={120} style={{ marginBottom: 16 }} />
      <View style={{ marginBottom: 16 }}>
        <Skeleton variant="text" width="40%" height={20} style={{ marginBottom: 16 }} />
        {Array.from({ length: 3 }).map((_, index) => (
          <View key={index} style={{ flexDirection: 'row', marginBottom: 8 }}>
            <Skeleton variant="card" width={80} height={80} style={{ marginRight: 16 }} />
            <View style={{ flex: 1 }}>
              <Skeleton variant="text" width="80%" height={16} style={{ marginBottom: 4 }} />
              <Skeleton variant="text" width="50%" height={14} style={{ marginBottom: 4 }} />
              <Skeleton variant="text" width="40%" height={16} />
            </View>
          </View>
        ))}
      </View>
      <Skeleton variant="card" height={150} />
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colors.gray[200],
  },
  default: {
    borderRadius: borderRadius.lg,
  },
  card: {
    borderRadius: borderRadius.xl,
  },
  text: {
    borderRadius: borderRadius.sm,
    height: 16,
  },
  circle: {
    borderRadius: 9999,
  },
  button: {
    borderRadius: borderRadius.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  categorySkeletonItem: {
    alignItems: 'center',
    marginBottom: 16,
  },
  productGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  productCardSkeleton: {
    width: 150,
    marginRight: 12,
  },
  productDetailContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  attributesRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  cartItemSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: borderRadius.lg,
    marginBottom: 12,
  },
  orderSkeleton: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: borderRadius.lg,
    marginBottom: 12,
  },
});
