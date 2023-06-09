import 'package:intl/intl.dart';

class Utils {
  static formatPrice(double price) => '\Rs ${price.toStringAsFixed(2)}';
  static formatDate(DateTime date) => DateFormat.yMMMEd().format(date);
}
