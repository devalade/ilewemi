import React from 'react';
import Layout from '@src/layout';
import { Badge, Box, Button, Table } from '@mantine/core';
import dayjs from 'dayjs';
import Link from 'next/link';

const PAYEMENT_MODE = {
  cash: 'green',
  online: 'cyan',
};

function Attandees() {
  return (
    <Box sx={{ maxWidth: 800 }} mx='auto'>
      <Link href='/attandees/new'>
        <Button variant='outline'>Payer la scolarité</Button>
      </Link>
      <Table mt={16}>
        <thead>
          <tr>
            <th>Ref de paiement</th>
            <th>Montant payé</th>
            <th>Mode de paiement</th>
            <th>Date de paiement</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4].map(() => (
            <tr>
              <td>2345</td>
              <td>12.000F CFA</td>
              <td>
                <Badge color={PAYEMENT_MODE['cash']} variant='light'>
                  cash
                </Badge>
              </td>
              <td>{dayjs().format('DD MMM  YYYY')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
}

export default Attandees;

Attandees.getLayout = function (page) {
  return <Layout>{page}</Layout>;
};
