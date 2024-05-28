import 'package:core_ui/tokens/theme/bitkub_base_color.g.dart';
import 'package:flutter/material.dart';

class BkTheme extends ThemeExtension<BkTheme> {
  BkTheme({required this.bkColor});

  final BitkubBaseColor bkColor;

  @override
  ThemeExtension<BkTheme> copyWith() {
    // TODO: implement copyWith
    throw UnimplementedError();
  }

  @override
  ThemeExtension<BkTheme> lerp(
    covariant ThemeExtension<BkTheme>? other,
    double t,
  ) {
    // TODO: implement lerp
    throw UnimplementedError();
  }
}
