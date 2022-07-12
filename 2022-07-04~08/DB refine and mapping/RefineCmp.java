package com.company;

import java.io.*;
import java.util.*;

public class RefineCmp {
    static List<String> company;
    static List<String> result = new ArrayList<>();

    public List<String> refine(List<String> company, int index) {
        RefineCmp.company = company;
        write(index);
        return result;
    }

    public static void write(int i) {
        String[] after_refine; // 차례대로 정제된 MZ_BIZ_CONT, A1~A7


            List<String> data = company;
            String[] input_data = {"", "", "", "", "", "", "", "", "", "", ""};
            List<String> line;

            if (i == 0) {
                input_data[0] = "CMP_CD";
                input_data[1] = "BIZ_NO";
                input_data[2] = "MN_BIZ_CONT";
                input_data[3] = "A1";
                input_data[4] = "A2";
                input_data[5] = "A3";
                input_data[6] = "A4";
                input_data[7] = "A5";
                input_data[8] = "A6";
                input_data[9] = "A7";
                input_data[10] = "IND_CD1";
            } else {
                after_refine = refineWord(data.get(2));
                for (int index = 0; index < 12; index++) {
                    switch (index) {
                        case 0:
                        case 1:
                        case 2: {
                            input_data[index] = data.get(index);
                            break;
                        }
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                        case 9: {
                            input_data[index] = after_refine[index - 3];
                            break;
                        }
                        case 10: {
                            input_data[index] = data.get(index - 7);
                            break;
                        }
                        default: {
                            break;
                        }
                    }

                }
            }
            result = Arrays.asList(input_data);
        }

    public static String[] refineWord(String cmp) {
        String[] after_cmp = {"", "", "", "", "", "", ""};
        String new_cmp;
        if (cmp != null) { // null이 아닌 경우만
            // 제거 대상 문자 제거
            try {
                new_cmp = cmp.replaceAll(" ", "")
                        .replace(".", "")
                        .replace("!", "")
                        .replace("~", "")
                        .replace("@", "")
                        .replace("*", "")
                        .replace("#", "")
                        .replace("ㆍ|·", "");
                // 시작이 숫자면 숫자 제거
                new_cmp = new_cmp.replaceFirst("[0-9]+", "");
                // '-'와 '-'뒤에 텍스트 다 제거
                new_cmp = new_cmp.replaceFirst("[-]+.*", "");

                // 3열(정제 후, A1)에 추가
                after_cmp[0] = new_cmp;

                // 3열 데이터에 소괄호가 있는 경우 소괄호 제거한 내용 8열에, 소괄호 내용만 9열에
                if (new_cmp.matches(".*\\(.+\\).*")) {
                    after_cmp[5] = new_cmp.replaceAll("\\([^\\)]+\\)", ""); // 소괄호를 제거한 텍스트
                    after_cmp[6] = new_cmp.split("\\(")[1].split("\\)")[0]; // 소괄호 안의 텍스트
                    new_cmp = new_cmp.replaceAll("\\(", "").replaceAll("\\)", ""); // 소괄호 문자만 제거한 텍스트
                    after_cmp[0] = new_cmp;
                } else {
                    new_cmp = new_cmp.replaceAll("(|)", "");
                }

                // 3열 데이터에 ,나 /가 있는 경우 따로따로 3-7열에 추가
                if (new_cmp.contains(",") || new_cmp.contains("/")) {
                    String[] array;
                    if (new_cmp.contains("A/S") || new_cmp.contains("S/W") ||
                            new_cmp.contains("D/M") || new_cmp.contains("A/V") ||
                            new_cmp.contains("H/W") || new_cmp.contains("C/T") ||
                            new_cmp.contains("a/s") || new_cmp.contains("s/w") ||
                            new_cmp.contains("d/m") || new_cmp.contains("a/v") ||
                            new_cmp.contains("h/w") || new_cmp.contains("c/t")
                    ) { // 특수한 경우는 제외
                        array = new_cmp.split(",");
                    } else {
                        array = new_cmp.split(",|/");
                    }

                    for (int i = 0; i < array.length; i++) {
                        if (i >= 5) break;
                        after_cmp[i] = array[i];
                    }
                }
            } catch (OutOfMemoryError e) {
                System.out.println(e);
                System.out.println(cmp);
            }
        }

        return after_cmp;
    }
}

