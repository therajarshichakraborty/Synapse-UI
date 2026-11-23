/**
 * Portal + PortalHost.
 *
 * Overlays (Dialog, Sheet, Select, Toast…) render into the nearest <PortalHost>
 * so they sit above your navigation. Put one at the root of your app:
 *
 *   <PortalHost>
 *     <Stack />
 *   </PortalHost>
 *
 * Without a host, overlays fall back to a transparent React Native <Modal>.
 */
import * as React from "react";
import { Modal, StyleSheet, View } from "react-native";

type Store = {
  set: (key: string, node: React.ReactNode) => void;
  remove: (key: string) => void;
};

const PortalContext = React.createContext<Store | null>(null);

export function PortalHost({ children }: { children?: React.ReactNode }) {
  const [nodes, setNodes] = React.useState<[string, React.ReactNode][]>([]);

  const store = React.useMemo<Store>(
    () => ({
      set: (key, node) =>
        setNodes((prev) => {
          const i = prev.findIndex(([k]) => k === key);
          if (i === -1) return [...prev, [key, node]];
          const next = prev.slice();
          next[i] = [key, node];
          return next;
        }),
      remove: (key) => setNodes((prev) => prev.filter(([k]) => k !== key)),
    }),
    [],
  );

  return (
    <PortalContext.Provider value={store}>
      <View style={styles.root}>
        {children}
        <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
          {nodes.map(([key, node]) => (
            <React.Fragment key={key}>{node}</React.Fragment>
          ))}
        </View>
      </View>
    </PortalContext.Provider>
  );
}

export function Portal({ children }: { children: React.ReactNode }) {
  const store = React.useContext(PortalContext);
  const key = React.useId();

  React.useLayoutEffect(() => {
    store?.set(key, children);
  }, [store, key, children]);

  React.useLayoutEffect(() => {
    return () => store?.remove(key);
  }, [store, key]);

  if (store) return null;
  return (
    <Modal transparent visible animationType="none" statusBarTranslucent>
      {children}
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
