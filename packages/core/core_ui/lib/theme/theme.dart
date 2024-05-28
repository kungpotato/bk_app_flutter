import 'package:core_ui/tokens/theme/bitkub_base_color.g.dart';
import 'package:core_ui/tokens/theme/bitkub_padding.g.dart';
import 'package:flutter/material.dart';

class BkTheme extends ThemeExtension<BkTheme> {
  BkTheme({required this.bkColor});

  final BitkubBaseColor bkColor;
  final bkPadding = BitkubPadding();

  @override
  ThemeExtension<BkTheme> copyWith({BitkubBaseColor? bkColor}) {
    return BkTheme(bkColor: bkColor ?? this.bkColor);
  }

  @override
  ThemeExtension<BkTheme> lerp(
    covariant ThemeExtension<BkTheme>? other,
    double t,
  ) {
    if (other is! BkTheme) {
      return this;
    }
    return this;
  }
}
