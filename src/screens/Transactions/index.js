import React from 'react';
import { ScrollView, View, StyleSheet, Image } from 'react-native';
import { Appbar, Text, useTheme, Button } from 'react-native-paper';

import noTransactions from '../../../assets/no-transactions.png';
import Divider from '../../components/Divider';
import { useTransactions } from '../../hooks/useTransactions';
import RippleTransaction from './components/RippleTransaction';

const Transactions = ({ navigation }) => {
  const { colors } = useTheme();
  const transactions = useTransactions();

  const pendingTransactions = transactions?.filter(
    (transaction) => transaction.payment.status === 'Menunggu Pembayaran'
  );

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Transaksi" />
        {transactions && (
          <View style={styles.appbarMenuContainer}>
            <Text
              onPress={() => navigation.navigate('TransactionsHistory')}
              style={[styles.appBarMenu, { color: colors.background }]}
            >
              Riwayat Transaksi
            </Text>
          </View>
        )}
      </Appbar.Header>

      {(!transactions || pendingTransactions?.length === 0) && (
        <View style={styles.vectorContainer}>
          <Image style={styles.vectorImage} source={noTransactions} />

          <Text style={styles.vectorText}>Belum ada transaksi saat ini</Text>
          <Button onPress={() => navigation.navigate('Home')} mode="contained">
            Konsultasi Sekarang
          </Button>
        </View>
      )}

      {pendingTransactions?.length > 0 && (
        <ScrollView>
          {pendingTransactions?.map((transaction) => {
            return (
              <React.Fragment key={transaction.id}>
                <RippleTransaction
                  image={transaction.product.image || null}
                  name={transaction.product.name}
                  price={transaction.product.price}
                  discount={transaction.product.discount}
                  timestamp={transaction.payment.createdAt}
                  status={transaction.payment.status}
                  onPress={() =>
                    navigation.navigate('Transaction', { transaction })
                  }
                />
                <Divider line />
              </React.Fragment>
            );
          })}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  appbarMenuContainer: { paddingRight: 12 },
  appBarMenu: { paddingVertical: 4 },
  vectorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 48,
  },
  vectorImage: { height: 240, resizeMode: 'contain' },
  vectorText: { fontSize: 16, marginTop: 16, marginBottom: 24 },
});

export default Transactions;
